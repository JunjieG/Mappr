import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./App.css";

import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyAucD4dS2Dj3iCfyMYaeQwppCpZaQYGnLo",
  authDomain: "mappr-1574369019968.firebaseapp.com",
  databaseURL: "https://mappr-1574369019968.firebaseio.com",
  projectId: "mappr-1574369019968",
  storageBucket: "mappr-1574369019968.appspot.com",
  messagingSenderId: "604941514326",
  appId: "1:604941514326:web:e15732396ac1961efd6df7"
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(error) {
        console.log("error", error);
      });
  }, [firebaseConfig]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedIn(true);
        fetch(`/api/users?id=${user.uid}`, {
          method: "GET"
        })
          .then(res => {
            console.log("res", res);
            return res.json();
          })
          .then(loggedUser => {
            console.log("user", loggedUser);
            setUser(loggedUser);
          });
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  function signupFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.email.value;
    let password = e.currentTarget.passwd.value;
    let username = e.currentTarget.username.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
        console.log(response);
        firebase
          .firestore()
          .collection("users")
          .doc(response.user.uid)
          .set({ email, username, uid: response.user.uid });
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }

  function loginFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.email.value;
    let password = e.currentTarget.passwd.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }

  function logoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        setLoggedIn(false);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          {loggedIn ? (
            <UserProfile user={user} logoutFunction={logoutFunction} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Login loginFunction={loginFunction} />
          )}
        </Route>
        <Route exact path="/signup">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <SignUp signupFunction={signupFunction} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
