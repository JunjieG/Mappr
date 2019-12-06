import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

import Contact from "./Contact";

import "./ChatBox.css";

let socket;

export default function ChatBox({ user }) {
  // States
  const [contacts, setContacs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [currentChatUID, setCurrentChatUID] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  // References
  const chatTab = useRef();
  const fl = useRef();
  const refs = [fl, chatTab];

  const ENDPOINT = "localhost:8080";

  // Connect to socket.io once the ENDPOINT is created (when website opens)
  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    if (user) {
      socket.emit("join", { uid: user.uid, room: "New York" }, () => {});
    }
  }, [user]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    console.log(messages);
  }, [messages]);

  // sending messages
  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const privateMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("privateMessage", currentChatUID, message, ({ error }) => {
        if (error) {
          console.log("Private message could not be sent: ", error);
        }
        setMessage("");
      });
      setMessages([...messages, { user: user.uid, text: message }]);
    }
  };

  const searchUser = e => {
    e.preventDefault();
    if (searchQuery) {
      socket.emit("findContact", searchQuery, ({ error, user }) => {
        setSearchQuery("");
        if (user) {
          setContacs([...contacts, user]);
          console.log(contacts);
        }
        if (error) {
          console.log(error);
        }
      });
    }
  };

  const Message = ({ message }) => {
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
    } else if (message.user === user.uid) {
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
      setCurrentChatUID("");
    }, 700);
  };

  return (
    <div id="chatbox">
      <div id="friendslist" ref={fl}>
        <div id="topmenu">
          <span className="friends"></span>
          <span className="room"></span>
          <span className="history"></span>
        </div>

        <div id="friends">
          {contacts.map((contact, i) => (
            <Contact
              key={i}
              contact={contact}
              setCurrentChatName={setCurrentChatName}
              setCurrentChatUID={setCurrentChatUID}
              references={refs}
            />
          ))}

          <div id="search">
            <input
              type="text"
              id="searchfield"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => (e.key === "Enter" ? searchUser(e) : null)}
            />
          </div>
        </div>
      </div>

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
            <Message key={i} message={message} />
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
    </div>
  );
}
