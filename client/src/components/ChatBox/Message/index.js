import React from "react";

import "firebase/firestore";

export default function Message({ message, receiverId, selfId }) {
  console.log("Message Component called.");
  if (receiverId === selfId) {
    return (
      <div className="message">
        <div className="bubble">
          {message}
          <span>3 min</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message right">
        <div className="bubble">
          {message}
          <span>3 min</span>
        </div>
      </div>
    );
  }
}
