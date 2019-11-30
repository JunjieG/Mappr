import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

import Login from './containers/Login';
import Logout from './containers/Logout';
import SignUp from './containers/SignUp';
import UserProfile from './containers/UserProfile';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header loggedIn={true}/>
      <Router>
        <Route exact path='/' component={UserProfile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/logout' component={Logout} />
      </Router>
    </div>
  );
}

export default App;
