import React from 'react';

import ChatBox from '../../components/ChatBox'
import MapBox from '../../components/MapBox'


export default function UserProfile({ user }) {
  return (
    <div className="UserProfile">
      <h1>Hello { user && user.uid }</h1>
      <h1>Hello { user && user.uid } { user && user.username }</h1>
      <div className="messageDiv">
      </div>
      <ChatBox user={user}/>
      <MapBox />
    </div>
  );
}
