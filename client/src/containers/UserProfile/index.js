import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import ChatBox from '../../components/ChatBox'

let socket;

export default function UserProfile({ user }) {
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:8080';

  // Connect to socket.io once the ENDPOINT is created (when website opens)
  useEffect(() => {
    socket = io(ENDPOINT);
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT])

  useEffect(() => {
    if (user) {
      socket.emit('join', { uid: user.uid, room: 'New York' }, () => {
      });
    }
  }, [user])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
    console.log(messages);
  }, [messages])

  // sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="UserProfile">
      <h1>Hello { user && user.uid }</h1>
      <div className="messageDiv">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
      <ChatBox />
    </div>
  );
}
