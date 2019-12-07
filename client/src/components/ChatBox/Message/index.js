import React from 'react';

import 'firebase/firestore';

export default function Message({ message, receiverId, selfId }) {
  if (message.user.trim().toLowerCase() === receiverId) {
    console.log("user");
    return (
      <div className="message">
        <div className="bubble">
          {message.text}
          <span>3 min</span>
        </div>
      </div>
    );
  } else if (message.user === selfId) {
    console.log("self");
    return (
      <div className="message right">
        <div className="bubble">
          {message.text}
          <span>3 min</span>
        </div>
      </div>
    );
  } else {
    console.log("other people", message.user);
    return null;
  }
};
