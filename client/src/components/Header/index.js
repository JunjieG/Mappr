import React from 'react';

import "./index.css";

export default function Header({ loggedIn, logoutFunction }) {
  return (
    <div className="App">
      <header>
        <nav>
          {loggedIn && <a href="/">Home</a>}
          {!loggedIn && <a href="/login">Log In</a>}
          {!loggedIn && <a href="/signup">Sign Up</a>}
          {loggedIn && <a onClick={ logoutFunction } href="/">Log Out</a>}
        </nav>
      </header>
    </div>
  );
}
