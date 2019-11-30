const express = require('express');
var app = express();

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
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

app.post('/api/users/login', (req, res) => {
  console.log('User tries to sign in: ', req.body)
  let email = req.body.email;
  let password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode)
    var errorMessage = error.message;
    console.log(errorMessage)

    if(errorCode != ''){
      res.json(errorCode)
    }
  });
});

app.post('/api/users/register', (req, res) => {
  console.log('A new user tries to register: ', req.body)
  let email = req.body.email;
  let password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode)
    var errorMessage = error.message;
    console.log(errorMessage)
    
    if(errorCode != ''){
      res.json(errorCode)
    }
  });
});

app.get('/api/users/logout', (req, res) => {
  console.log('User logs out')
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error)
  });
});


app.get('/api/users/getuser', (req, res) => {
  var user = firebase.auth().currentUser;

  if (user) {
    res.json(user)
  } else {
    res.json({
      'error': 'not logged in'
    })
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
