"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
// import { useUser } from '@clerk/nextjs';
import 'stream-chat-react/dist/css/v2/index.css';

// const apiKey = 's5hmee6x8y6c';
//const userId = 'user_2xZzF3GQKALwFTqnAZ7ilEgK6xc';
//const userName = 'Samar Pratap';
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yeFp6RjNHUUtBTHdGVHFuQVo3aWxFZ0s2eGMifQ.ScErrJmx0yhe3SY5GZsdNUoHM7OiHthvKb7F9mL-Q14';

const ChatForum = ({clerkUser,slug}) => {
    const apiKey="s5hmee6x8y6c";
    const userId=clerkUser.id;
    const userName = clerkUser.name;
    const userToken =clerkUser.token;
    // const useUser=useUser();
    const user = { 
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
   };
  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });
  function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', slug , {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(slug),
      members: [userId],
    });

    setChannel(channel);
    //channel.addMembers([userId])
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatForum;
