const express = require('express');
var app = express();

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

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

app.use(express.urlencoded());
app.use(express.json()); 


app.listen(port, () => console.log(`Server running on port ${port}`));
