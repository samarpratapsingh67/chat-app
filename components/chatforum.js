"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChannelStateContext,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const ChatForum = ({ clerkUser, slug }) => {
  const apiKey = "s5hmee6x8y6c";
  const userId = clerkUser.id;
  const userName = clerkUser.name;
  const userToken = clerkUser.token;

  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };

  const [channel, setChannel] = useState();
  const [aiResponses, setAiResponses] = useState({});
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showAIResponses, setShowAIResponses] = useState(false);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Function to send data to API and get AI responses
  const sendMessagesToAPI = async (messages, channelId) => {
    try {
      setIsLoadingAI(true);
      const response = await fetch('/api/getAllMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageSets: messages,
          channelId,
          userId,
          slug,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Messages sent successfully:', result);
        
        // Store AI responses
        if (result.data.aiResponses) {
          setAiResponses(result.data.aiResponses);
          setShowAIResponses(true);
        }
      } else {
        console.error('Failed to send messages:', result.error);
      }
    } catch (error) {
      console.error('Error sending messages to API:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Function to send AI response as a message
  const sendAIResponse = async (responseText, originalUserId, originalUserName) => {
    if (channel && responseText.trim()) {
      try {
        await channel.sendMessage({
          text: responseText, // Send only the response text without prefix
          user: user,
        });
        console.log('AI response sent as message');
      } catch (error) {
        console.error('Error sending AI response:', error);
      }
    }
  };

  useEffect(() => {
    if (!client) return;
    
    console.log(client);
    const channel = client.channel('messaging', slug, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(slug),
      members: [userId],
    });

    channel.watch().then(() => {
      console.log('Channel watched successfully');
      
      const messages = channel.state.messages;
      console.log('Channel messages:', messages);

      if (messages && Object.keys(messages).length > 0) {
        const messagesArray = Object.values(messages);
        sendMessagesToAPI(messagesArray, channel.id);
      }
    }).catch(err => {
      console.error('Error watching channel:', err);
    });

    setChannel(channel);
  }, [client, slug, userId]);

  // Function to manually trigger AI responses
  const handleGetAIResponses = async () => {
    if (channel) {
      try {
        await channel.query({
          messages: { limit: 100 }
        });
        
        const messages = channel.state.messages;
        if (messages) {
          const messagesArray = Object.values(messages);
          console.log('Sending messages for AI analysis:', messagesArray);
          sendMessagesToAPI(messagesArray, channel.id);
        } else {
          console.log('No messages found in channel');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // AI Responses Component
  const AIResponsesPanel = () => {
    if (!showAIResponses || Object.keys(aiResponses).length === 0) {
      return null;
    }

    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ margin: 0, color: '#495057', fontSize: '16px' }}>
            🤖 AI Response Suggestions
          </h3>
          <button
            onClick={() => setShowAIResponses(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#6c757d'
            }}
          >
            ×
          </button>
        </div>

        {Object.entries(aiResponses).map(([userIdKey, userInfo]) => {
          if (userIdKey === 'error') {
            return (
              <div key="error" style={{
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                padding: '10px',
                marginBottom: '10px',
                color: '#721c24'
              }}>
                <strong>Error:</strong> {userInfo.message}
              </div>
            );
          }

          return (
            <div key={userIdKey} style={{
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '15px'
            }}>
              <h4 style={{
                margin: '0 0 10px 0',
                color: '#495057',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                👤 {userInfo.userName}
              </h4>
              
              {userInfo.responses && userInfo.responses.map((response, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  padding: '8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    flex: 1,
                    fontSize: '13px',
                    color: '#495057',
                    marginRight: '10px'
                  }}>
                    {response}
                  </span>
                  <button
                    onClick={() => sendAIResponse(response, userIdKey, userInfo.userName)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                  >
                    Send
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  console.log("Channel created:", channel);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
          
          {/* AI Response Generation Button - Below Chat */}
          <div style={{ padding: '10px', borderTop: '1px solid #dee2e6' }}>
            <button
              onClick={handleGetAIResponses}
              disabled={isLoadingAI}
              style={{
                padding: '8px 12px',
                backgroundColor: isLoadingAI ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoadingAI ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {isLoadingAI ? '🔄 Generating...' : '🤖 Get AI Suggestions'}
            </button>
          </div>

          {/* AI Responses Panel - Below Chat */}
          <AIResponsesPanel />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatForum;