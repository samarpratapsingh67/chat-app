"use client";
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
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

  // Use useCallback to memoize the function and prevent unnecessary recreations
  const sendMessagesToAPI = useCallback(async (messages, channelId) => {
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
  }, [userId, slug]); // Include dependencies that the function uses

  // Function to send AI response as a message
  const sendAIResponse = async (responseText, originalUserId, originalUserName) => {
    if (channel && responseText.trim()) {
      try {
        await channel.sendMessage({
          text: responseText,
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
  }, [client, slug, userId, sendMessagesToAPI]); // Now include sendMessagesToAPI in dependencies

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

  // Floating 3D Animation Component
  const FloatingOrb = ({ delay = 0, color = '#667eea' }) => (
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: `linear-gradient(45deg, ${color}, ${color}88)`,
        boxShadow: `0 8px 32px ${color}44`,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: 1,
      }}
    />
  );

  // AI Responses Component with 3D Effects
  const AIResponsesPanel = () => {
    if (!showAIResponses || Object.keys(aiResponses).length === 0) {
      return null;
    }

    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        borderRadius: '20px',
        padding: '2px',
        margin: '15px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        animation: 'glow 4s ease-in-out infinite alternate'
      }}>
        {/* Floating 3D Elements */}
        <FloatingOrb delay={0} color="#667eea" />
        <FloatingOrb delay={2} color="#f093fb" />
        <FloatingOrb delay={4} color="#4facfe" />
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '18px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              margin: 0,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '20px',
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(102, 126, 234, 0.3)'
            }}>
              🤖 AI Magic Suggestions ✨
            </h3>
            <button
              onClick={() => setShowAIResponses(false)}
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                transform: 'perspective(100px) rotateX(0deg)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'perspective(100px) rotateX(10deg) translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'perspective(100px) rotateX(0deg) translateY(0px)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
              }}
            >
              ×
            </button>
          </div>

          {Object.entries(aiResponses).map(([userIdKey, userInfo], userIndex) => {
            if (userIdKey === 'error') {
              return (
                <div key="error" style={{
                  background: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
                  border: '2px solid rgba(245, 101, 101, 0.3)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px',
                  color: '#721c24',
                  boxShadow: '0 8px 32px rgba(245, 101, 101, 0.2)',
                  transform: 'perspective(1000px) rotateX(2deg)'
                }}>
                  <strong>🚨 Oops!</strong> {userInfo.message}
                </div>
              );
            }

            const userColors = [
              { primary: '#667eea', secondary: '#764ba2' },
              { primary: '#f093fb', secondary: '#f5576c' },
              { primary: '#4facfe', secondary: '#00f2fe' },
              { primary: '#43e97b', secondary: '#38f9d7' },
              { primary: '#fa709a', secondary: '#fee140' }
            ];
            
            const userColor = userColors[userIndex % userColors.length];

            return (
              <div key={userIdKey} style={{
                background: `linear-gradient(135deg, ${userColor.primary}22, ${userColor.secondary}22)`,
                border: `2px solid ${userColor.primary}44`,
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 12px 35px ${userColor.primary}33`,
                transform: 'perspective(1000px) rotateX(1deg)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${userColor.primary}44`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(1deg) translateY(0px)';
                e.currentTarget.style.boxShadow = `0 12px 35px ${userColor.primary}33`;
              }}
              >
                {/* 3D User Avatar Background */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${userColor.primary}, ${userColor.secondary})`,
                  opacity: 0.1,
                  transform: 'perspective(100px) rotateY(20deg)'
                }} />
                
                <h4 style={{
                  margin: '0 0 15px 0',
                  background: `linear-gradient(45deg, ${userColor.primary}, ${userColor.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    filter: `drop-shadow(2px 2px 4px ${userColor.primary}66)`
                  }}>👤</span>
                  {userInfo.userName}
                </h4>
                
                {userInfo.responses && userInfo.responses.map((response, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '15px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${userColor.primary}33`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Animated gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${userColor.primary}22, transparent)`,
                      animation: 'shimmer 3s infinite'
                    }} />
                    
                    <span style={{
                      flex: 1,
                      fontSize: '14px',
                      color: '#2c3e50',
                      lineHeight: '1.5',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {response}
                    </span>
                    <button
                      onClick={() => sendAIResponse(response, userIdKey, userInfo.userName)}
                      style={{
                        background: `linear-gradient(45deg, ${userColor.primary}, ${userColor.secondary})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: `0 4px 15px ${userColor.primary}44`,
                        transform: 'perspective(100px) rotateX(0deg)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        zIndex: 1
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'perspective(100px) rotateX(-5deg) translateY(-2px)';
                        e.target.style.boxShadow = `0 8px 25px ${userColor.primary}66`;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'perspective(100px) rotateX(0deg) translateY(0px)';
                        e.target.style.boxShadow = `0 4px 15px ${userColor.primary}44`;
                      }}
                    >
                      🚀 Send
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes glow {
            0% { box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
            100% { box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    );
  };

  console.log("Channel created:", channel);

  if (!client) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '20px 40px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        🚀 Setting up client & connection...
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      minHeight: '100vh',
      padding: '10px'
    }}>
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
            
            {/* AI Response Generation Button - Below Chat */}
            <div style={{ 
              padding: '15px', 
              borderTop: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
            }}>
              <button
                onClick={handleGetAIResponses}
                disabled={isLoadingAI}
                style={{
                  background: isLoadingAI 
                    ? 'linear-gradient(45deg, #95a5a6, #bdc3c7)' 
                    : 'linear-gradient(45deg, #2ecc71, #27ae60, #16a085)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoadingAI ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isLoadingAI 
                    ? '0 6px 20px rgba(149, 165, 166, 0.3)' 
                    : '0 8px 25px rgba(46, 204, 113, 0.4)',
                  transform: 'perspective(100px) rotateX(0deg)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  if (!isLoadingAI) {
                    e.target.style.transform = 'perspective(100px) rotateX(-3deg) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(46, 204, 113, 0.6)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoadingAI) {
                    e.target.style.transform = 'perspective(100px) rotateX(0deg) translateY(0px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.4)';
                  }
                }}
              >
                {isLoadingAI ? (
                  <>
                    <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span>
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <span>🤖</span>
                    Get AI Suggestions
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Responses Panel - Below Chat */}
            <AIResponsesPanel />
          </Window>
          <Thread />
        </Channel>
      </Chat>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatForum;