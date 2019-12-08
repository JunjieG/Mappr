import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

import Contact from "./Contact";
import ChatView from "./ChatView";

import "./ChatBox.css";

let socket;

export default function ChatBox({ user }) {
  // States
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [receiverId, setReceiverId] = useState("");

  // References
  const fl = useRef();

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
      console.log("useresar", user);
      socket.emit("join", { userData: user, location: "New York" }, () => {});
    }
  }, [user]);

  const searchUser = e => {
    e.preventDefault();
    if (searchQuery) {
      socket.emit("findContact", searchQuery, ({ error, user }) => {
        setSearchQuery("");
        if (user) {
          setContacts([...contacts, user]);
          console.log("constact", contacts);
        }
        if (error) {
          console.log("constact", contacts);
          console.log(error);
        }
      });
    }
  };

  const contactClick = e => {
    // Create user profile picture when clicked
    setReceiverId(e.currentTarget.getAttribute("contact-id"));

    let clone = e.currentTarget.childNodes[0].childNodes[0].cloneNode(true);
    let childTop =
      e.currentTarget.offsetTop -
      e.currentTarget.parentNode.parentNode.offsetTop;
    let top = childTop + 12 + "px";
    clone.style.top = top;
    clone.classList.add("floatingImg");
    document.querySelector("#profile").appendChild(clone);
    document.querySelector(".floatingImg").style.left = "108px";
    document.querySelector(".floatingImg").style.top = "30px";
    document.querySelector(".floatingImg").style.width = "68px";

    // Reset chat name
    setCurrentChatName("");

    // Fade out friendlist and fade in chat box
    fl.current.classList.toggle("fade");
    document.querySelector("#chatview").style.display = "block";
    setTimeout(function() {
      document.querySelector("#chatview").classList.toggle("fade");
    }, 10);
    setCurrentChatName(
      e.currentTarget.childNodes[0].childNodes[1].childNodes[0].innerHTML
    );
    document.querySelector("#profile p").classList.add("animate");
    setTimeout(function() {
      // Display chat messages
      document.querySelector("#chat-messages").classList.add("animate");

      // Close button
      document.querySelector(".cx").classList.add("s1");
      document.querySelector(".cy").classList.add("s1");
      setTimeout(function() {
        document.querySelector(".cx").classList.add("s2");
        document.querySelector(".cy").classList.add("s2");
      }, 100);
      setTimeout(function() {
        document.querySelector(".cx").classList.add("s3");
        document.querySelector(".cy").classList.add("s3");
      }, 200);
    }, 100);
  };

  let contactList = contacts.map((contact, i) => (
    <div
      key={i}
      contact-id={contact.userData.uid}
      className="contact-wrapper"
      onClick={e => contactClick(e)}
    >
      <Contact
        contact={contact}
        setCurrentChatName={setCurrentChatName}
        setReceiverId={setReceiverId}
        friendList={fl}
      />
    </div>
  ));

  return (
    <div id="chatbox">
      <div id="friendslist" ref={fl}>
        <div id="topmenu">
          <span className="friends"></span>
          <span className="room"></span>
          <span className="history"></span>
        </div>

        <div id="friends">
          {contactList}
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
      <ChatView
        fl={fl}
        setters={setReceiverId}
        user={user}
        currentChatName={currentChatName}
        receiverId={receiverId}
        socket={socket}
      />
    </div>
  );
}
