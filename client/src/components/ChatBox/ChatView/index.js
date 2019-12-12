import React, { useState, useEffect, useRef } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";

import Message from "../Message";

const firebaseConfig = {
  apiKey: "AIzaSyAucD4dS2Dj3iCfyMYaeQwppCpZaQYGnLo",
  authDomain: "mappr-1574369019968.firebaseapp.com",
  databaseURL: "https://mappr-1574369019968.firebaseio.com",
  projectId: "mappr-1574369019968",
  storageBucket: "mappr-1574369019968.appspot.com",
  messagingSenderId: "604941514326",
  appId: "1:604941514326:web:e15732396ac1961efd6df7"
};

export default function ChatView({
  fl,
  setters,
  user,
  currentChatName,
  receiverId,
  socket
}) {
  const [messages, setMessages] = useState([]);

  const bottom = useRef();

  // Decided to not use state to prevent unnecessary
  // rerenders when the user types stuff in
  let currentMessageBox = "";

  let scrollToBottom = () => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    if (user && receiverId) {
      let chatId = "";
      if (user.uid < receiverId) {
        chatId = user.uid + receiverId;
      } else {
        chatId = receiverId + user.uid;
      }

      let db = firebase.firestore();
      console.log("went to firebase", chatId);

      db.collection("messages")
        .doc(chatId)
        .get()
        .then(doc => {
          if (doc.exists) {
            let messageObject = doc.data().message;
            let messageArray = [];
            for (let key in messageObject) {
              messageArray.push(messageObject[key]);
            }
            setMessages(messageArray);
          } else {
            console.log("No such chat!");
          }
        })
        .catch(function(error) {
          console.log("Error getting chat:", error);
        });
    }
  }, [firebaseConfig, user, receiverId]);

  useEffect(() => {
    try {
      socket.on("message", incomingMessage => {
        setMessages([...messages, incomingMessage]);
        console.log('incomingMessage', incomingMessage);
      });
      scrollToBottom();
    } catch {
      console.log("socket not ready");
    }
  }, [messages]);

  // sending messages
  const sendGroupMessage = e => {
    e.preventDefault();
    if (currentMessageBox) {
      socket.emit(
        "sendGroupMessage",
        currentMessageBox,
        () => (currentMessageBox = "")
      );
    }
  };

  const privateMessage = e => {
    e.preventDefault();
    if (currentMessageBox) {
      let senderId = user.uid;
      socket.emit(
        "privateMessage",
        currentMessageBox,
        receiverId,
        senderId,
        Date.now(),
        ({ error }) => {
          if (error) {
            console.log("Private message could not be sent: ", error);
          }
        }
      );
      setMessages([
        ...messages,
        {
          messageText: currentMessageBox,
          receiverId,
          senderId: user.uid,
          timeStamp: Date.now()
        }
      ]);
      document.querySelector("#message-box").value = "";
      currentMessageBox = "";
    }
  };

  const closeClick = () => {
    let profileImg = document.querySelector(".floatingImg");

    document.querySelector("#chat-messages").classList.remove("animate");
    document.querySelector("#profile").classList.remove("animate");
    document.querySelector("#profile p").classList.remove("animate");
    // Fade in friendlist and fade out chat box
    document.querySelector("#chatview").classList.toggle("fade");
    setTimeout(function() {
      fl.current.classList.toggle("fade");
    }, 10);
    document.querySelector("#profile p").classList.remove("animate");

    // Close button
    document.querySelector(".cx").classList.remove("s1", "s2", "s3");
    document.querySelector(".cy").classList.remove("s1", "s2", "s3");
    setTimeout(function() {
      document.querySelector("#chatview").style.display = "none";
      profileImg.parentNode.removeChild(profileImg);
      setters("");
    }, 700);
  };

  return (
    <div id="chatview" className="p1 fade">
      <div id="profile">
        <div id="close" onClick={() => closeClick()}>
          <div className="cy"></div>
          <div className="cx"></div>
        </div>

        <p>{currentChatName}</p>
      </div>

      <div id="chat-messages">
        <label>Thursday 02</label>
        {messages.map((currentMessage, i) => (
          <Message
            key={i}
            message={currentMessage.messageText}
            receiverId={currentMessage.receiverId}
            selfId={user.uid}
          />
        ))}
        <div ref={bottom}></div>
      </div>

      <div id="sendmessage">
        <input
          id="message-box"
          type="text"
          placeholder="Message..."
          onChange={e => (currentMessageBox = e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? privateMessage(e) : null)}
        />
        <button id="send"></button>
      </div>
    </div>
  );
}
