import React from "react";

import "./Header.css";

export default function Header({ logoutFunction, setLocation, currentUser }) {
  return (
    <div className="App">
      <header>
        <nav className="navigationWrapper">
          <div className="logoWrapper">
            <img src="/Mappr.svg" alt="logo"></img>
          </div>
          <ul className="navigation">
            <li className="parent">
              <a className="link" href="#">
                {currentUser && currentUser.username}
              </a>
            </li>
            <li className="parent" id="divider">
              |
            </li>
            <li className="parent">
              <a className="link" onClick={setLocation} href="#">
                Where Am I?
              </a>
            </li>
            <li className="parent">
              <a className="link" onClick={logoutFunction} href="/">
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
