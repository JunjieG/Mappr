import React from 'react';


export default function Message({ message, currentChatUID, selfUID }) {
  if (message.user.trim().toLowerCase() === currentChatUID) {
    console.log("user");
    return (
      <div className="message">
        <div className="bubble">
          {message.text}
          <span>3 min</span>
        </div>
      </div>
    );
  } else if (message.user === selfUID) {
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
