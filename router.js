const express = require('express');
const router = express.Router();

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

var db = firebase.firestore();

router.get('/', (req, res) => {
  res.send('Server is up and running');
});

router.get('/users', (req, res) => {
  db.collection('users').doc(req.query.id).get().then(doc => {
    if (!doc.exists) {
      console.log('Something went terribly wrong. User not in database');
      res.send('User not found');
    } else {
      res.send(doc.data());
    }
  }).catch(err => {
    res.send('Error getting User');
  })
});

module.exports = router;
