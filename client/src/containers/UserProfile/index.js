import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function UserProfile({ user }) {
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:8080';

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);

      socket.emit();
    }

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, user])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  const eventHandler = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="LogOut">
      <h1>Hello</h1>
    </div>
  );
}
