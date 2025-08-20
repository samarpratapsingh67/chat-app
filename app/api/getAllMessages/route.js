import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Global variable to store processed messages
let globalProcessedMessages = [];

// Initialize the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to format messages into a single prompt string
function formatMessagesForPrompt(messages) {
  if (!messages || messages.length === 0) {
    return "No messages to analyze.";
  }
  
  return messages
    .slice() // Create a copy to avoid mutating the original array
    .reverse()
    .filter(message => message.text && message.text.trim() !== '') // Filter out empty messages
    .map(message => `${message.user?.name || 'Unknown User'}: ${message.text}`)
    .join('\n');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { messageSets, channelId, userId, slug, timestamp } = body;

    console.log('Received data:', {
      channelId,
      userId,
      slug,
      timestamp,
      messageCount: messageSets?.length || 0
    });

    // Validation
    if (!channelId || !userId || !slug) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: channelId, userId, or slug' 
        },
        { status: 400 }
      );
    }

    // Check if GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI service not configured' 
        },
        { status: 500 }
      );
    }

    if (messageSets && Array.isArray(messageSets) && messageSets.length > 0) {
      // Process messages with better error handling
      const processedMessages = messageSets
        .filter(message => message && message.text) // Filter out null/undefined messages
        .map(message => ({
          id: message.id,
          text: message.text,
          user: {
            id: message.user?.id || 'unknown',
            name: message.user?.name || 'Unknown User',
            image: message.user?.image || ''
          },
          created_at: message.created_at,
          updated_at: message.updated_at,
          type: message.type || 'regular'
        }));

      console.log('Processed messages:', processedMessages);
      
      // Store processed messages in global variable for later use
      globalProcessedMessages = [...processedMessages];
      
      // Print the array separately for debugging
      console.log('=== GLOBAL PROCESSED MESSAGES ARRAY ===');
      console.log(JSON.stringify(globalProcessedMessages, null, 2));
      console.log('=== END OF MESSAGES ARRAY ===');

      // --- 🚀 AI Generation Logic Starts Here ---
      let aiResponses = {};

      try {
        // Only proceed if we have messages with text content
        if (processedMessages.length === 0) {
          aiResponses = { general: ['No valid messages found to analyze.'] };
        } else {
          console.log('--- STARTING AI GENERATION ---');
          
          // Get unique users from the conversation
          const uniqueUsers = [...new Set(processedMessages.map(msg => msg.user.id))];
          console.log('Unique users found:', uniqueUsers);
          
          // Get the generative model
          let model;
          try {
            model = genAI.getGenerativeModel({ 
              model: "gemini-2.0-flash-exp"
            });
          } catch (modelError) {
            console.error('Error creating model:', modelError);
            throw new Error('Failed to initialize AI model');
          }

          const chatHistory = formatMessagesForPrompt(processedMessages);
          console.log('Chat history formatted:', chatHistory);
          
          // Generate 3 responses for each unique user
          for (const userId of uniqueUsers) {
            const userMessages = processedMessages.filter(msg => msg.user.id === userId);
            const userName = userMessages[0]?.user?.name || 'Unknown User';
            
            console.log(`--- GENERATING RESPONSES FOR USER: ${userName} (${userId}) ---`);
            
            const userResponses = [];
            
            // Generate 3 different responses for this user
            for (let i = 1; i <= 3; i++) {
              try {
                const prompt = `You are participating in a chat conversation. Below is the conversation history. Generate a natural, contextual reply specifically tailored for "${userName}" based on their participation in the conversation.

CONVERSATION HISTORY:
${chatHistory}

USER CONTEXT: You are generating response option ${i} of 3 for "${userName}".

Instructions:
- Generate a conversational reply as if you're responding specifically to "${userName}"
- Keep the tone friendly and engaging
- If someone asks a question, answer it directly
- If it's a discussion, add valuable insights or ask follow-up questions  
- If someone shares something, respond appropriately (congratulate, empathize, etc.)
- Keep your reply concise but meaningful (1-3 sentences)
- Don't introduce yourself or mention you're an AI
- Make each response option unique and different from the others

Reply Option ${i}:`;
                
                console.log(`--- SENDING REQUEST ${i} FOR ${userName} ---`);
                
                const result = await model.generateContent({
                  contents: [{
                    role: 'user',
                    parts: [{
                      text: prompt
                    }]
                  }]
                });

                const response = await result.response;
                const aiResponse = response.text().trim();
                
                userResponses.push(aiResponse);
                console.log(`AI Response ${i} for ${userName}:`, aiResponse);
                
                // Small delay between requests to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
                
              } catch (responseError) {
                console.error(`Error generating response ${i} for ${userName}:`, responseError);
                userResponses.push(`Response ${i} temporarily unavailable`);
              }
            }
            
            // Store responses for this user
            aiResponses[userId] = {
              userName: userName,
              responses: userResponses
            };
          }
          
          console.log('--- ALL AI RESPONSES GENERATED ---');
          console.log('Final AI Responses:', JSON.stringify(aiResponses, null, 2));
        }
        
      } catch (aiError) {
        console.error('Error generating AI responses:', aiError);
        console.error('AI Error details:', {
          message: aiError.message,
          status: aiError.status,
          statusText: aiError.statusText,
          stack: aiError.stack
        });
        
        // Fallback error response
        aiResponses = {
          error: {
            message: 'AI service temporarily unavailable',
            details: aiError.message || 'Unknown error'
          }
        };
      }

      // --- 🚀 AI Generation Logic Ends Here ---

      return NextResponse.json({
        success: true,
        message: 'Messages processed successfully',
        data: {
          channelId,
          slug,
          messageCount: processedMessages.length,
          processedMessages: processedMessages,
          aiResponses: aiResponses, // Now contains responses for each user
          timestamp
        }
      });

    } else {
      console.log('No valid messages provided');
      return NextResponse.json({
        success: true,
        message: 'No messages to process',
        data: {
          channelId,
          slug,
          messageCount: 0,
          aiResponses: { general: ['No messages available for AI analysis.'] },
          timestamp
        }
      });
    }

  } catch (error) {
    console.error('Error processing messages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const slug = searchParams.get('slug');
    const userId = searchParams.get('userId');

    if (!channelId && !slug) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either channelId or slug is required' 
        },
        { status: 400 }
      );
    }

    console.log('GET request for messages:', { channelId, slug, userId });

    return NextResponse.json({
      success: true,
      message: 'Messages retrieved successfully',
      data: {
        channelId,
        slug,
        userId,
        messages: globalProcessedMessages,
        totalMessages: globalProcessedMessages.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error retrieving messages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}