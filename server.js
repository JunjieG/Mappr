const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  getUser,
  getUserUID,
  getUserInRoom
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
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

io.on("connection", socket => {
  console.log("someone has connected");

  socket.on("join", ({ uid, room }, callback) => {
    const { user } = addUser({ socket_id: socket.id, uid, room });
    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.uid, text: message });
  });

  socket.on("privateMessage", (senderId, receiverId, messageText, callback) => {
    let chatId = 'placeholder';
    if (senderId < receiverId) {
      chatId = senderId + receiverId;
    } else {
      chatId = receiverId + senderId;
    }
    const sender = getUser(socket.id);
    const receiver = getUserUID(receiverId);
    if (receiver) {
      io.to(`${receiver.socket_id}`).emit("message", {
        user: sender.uid,
        text: messageText
      });
      let message = {
        messageText,
        senderId,
        receiverId,
        timeStamp: Date.now()
      }
      db.collection('messages').doc(chatId).collection('chat').add(message);
      console.log(db.collection('messages').doc(chatId).collection('chat').add(message));
    } else {
      callback({ error: "Target person not found" });
    }
  });

  socket.on("findContact", (uid, callback) => {
    uid = uid.trim().toLowerCase();
    const user = getUserUID(uid);
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

app.use(router);

server.listen(port, () => console.log(`Server has started on port ${port}`));
