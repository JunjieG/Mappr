import React from 'react';

import ChatBox from '../../components/ChatBox'
import MapBox from '../../components/MapBox'


export default function UserProfile({ user }) {
  return (
    <div className="UserProfile">
      <h1>Hello { user && user.uid }</h1>
      <MapBox />
    </div>
  );
}
