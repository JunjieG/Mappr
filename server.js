const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require('path');

const {
  addUser,
  removeUser,
  getUser,
  getUserByEmail,
  getUserByUid,
  getUserInArea
} = require("./users.js");

var app = express();

//const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server);

const router = require("./router.js");

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAucD4dS2Dj3iCfyMYaeQwppCpZaQYGnLo",
  authDomain: "mappr-1574369019968.firebaseapp.com",
  databaseURL: "https://mappr-1574369019968.firebaseio.com",
  projectId: "mappr-1574369019968",
  storageBucket: "mappr-1574369019968.appspot.com",
  messagingSenderId: "604941514326",
  appId: "1:604941514326:web:e15732396ac1961efd6df7"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore();

io.on("connection", socket => {

  socket.on("join", ({ userData, location }, callback) => {
    const { user } = addUser({ socket_id: socket.id, userData, location });
    socket.join(user.room);
    console.log(`${userData.username} has joined the room`)
    callback();
  });

  socket.on("sendGroupMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.uid, text: message });
  });

  socket.on("privateMessage", (messageText, receiverId, senderId, timeStamp, callback) => {
    let timeReceived = Date.now()
    let chatId = '';
    if (senderId < receiverId) {
      chatId = senderId + receiverId;
    } else {
      chatId = receiverId + senderId;
    }
    const receiver = getUserByUid(receiverId);
    if (receiver) {
      console.log('emiting message to', receiverId);
      io.to(`${receiver.socket_id}`).emit("message", {
        messageText,
        receiverId,
        senderId,
        timeStamp
      });
      let messageId = timeReceived + senderId;
      let message = {
        [messageId]: {
          messageText,
          senderId,
          receiverId,
          timeStamp: Date.now()
        }
      }
      db.collection('messages').doc(chatId).set({message}, {merge: true});
    } else {
      callback({ error: "Target person not found" });
    }
  });

  socket.on("findContact", (email, callback) => {
    email = email.trim().toLowerCase();
    const user = getUserByEmail(email);
    if (user) {
      callback({ user });
    } else {
      callback({ error: "User not found" });
    }
  });

  socket.on("disconnect", () => {
    console.log("use has left");
  });
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(router);

server.listen(port, () => console.log(`Server has started on port ${port}`));
