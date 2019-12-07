import React from 'react';

export default function ChatView() {
  const closeClick = () => {
    let profileImg = document.querySelector(".floatingImg");

    document.querySelector("#chat-messages").classList.remove("animate");
    document.querySelector("#profile").classList.remove("animate");
    document.querySelector("#profile p").classList.remove("animate");
    // Fade in friendlist and fade out chat box
    chatTab.current.classList.toggle("fade");
    setTimeout(function() {
      fl.current.classList.toggle("fade");
    }, 10);
    document.querySelector("#profile p").classList.remove("animate");

    // Close button
    document.querySelector(".cx").classList.remove("s1", "s2", "s3");
    document.querySelector(".cy").classList.remove("s1", "s2", "s3");
    setTimeout(function() {
      chatTab.current.style.display = "none";
      profileImg.parentNode.removeChild(profileImg);
      setReceiverId("");
    }, 700);
  };

  return (
    <div id="chatview" className="p1 fade" ref={chatTab}>
      <div id="profile">
        <div id="close" onClick={() => closeClick()}>
          <div className="cy"></div>
          <div className="cx"></div>
        </div>

        <p>{currentChatName}</p>
      </div>

      <div id="chat-messages">
        <label>Thursday 02</label>
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            receiverId={receiverId}
            selfId={user.uid}
          />
        ))}
      </div>

      <div id="sendmessage">
        <input
          type="text"
          value={message}
          placeholder="Message..."
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? privateMessage(e) : null)}
        />
        <button id="send"></button>
      </div>
    </div>
  )
}
