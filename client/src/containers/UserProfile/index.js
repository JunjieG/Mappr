import React from 'react';

import ChatBox from '../../components/ChatBox'


export default function UserProfile({ user }) {
  return (
    <div className="UserProfile">
      <h1>Hello { user && user.uid }</h1>
      <div className="messageDiv">
      </div>
      <ChatBox user={user}/>
    </div>
  );
}
