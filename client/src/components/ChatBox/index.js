import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

import Contact from "./Contact";
import Message from "./Message";
import ChatView from "./Message";

import "./ChatBox.css";

let socket;

export default function ChatBox({ user }) {
  // States
  const [contacts, setContacs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [receiverId, setReceiverId] = useState("");
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
      socket.emit("privateMessage", user.uid, receiverId, message, ({ error }) => {
        if (error) {
          console.log("Private message could not be sent: ", error);
        }
      });
      setMessages([...messages, { user: user.uid, text: message }]);
      setMessage("");
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
              setReceiverId={setReceiverId}
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

      <ChatView />
    </div>
  );
}
