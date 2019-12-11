import React from "react";

import "./LoginForm.css";

export default function LoginForm({ state, submitFunction }) {
  let focus = e => {
    e.currentTarget.parentNode.childNodes[0].classList.add("formTop");
    document.querySelector("#formWrapper").classList.add("darken-bg");
  };

  let focusOut = e => {
    if (e.currentTarget.value.length == 0) {
      e.currentTarget.parentNode.childNodes[0].classList.remove("formTop");
    }
    document.querySelector("#formWrapper").classList.remove("darken-bg");
  };

  return (
    <div id="formWrapper">
      <div id="form">
        <form onSubmit={e => submitFunction(e)}>
          <div class="logo">
            <img src="/Mappr.svg" alt="logo"></img>
          </div>
          {state === "register" && (
            <div class="form-item">
              <label className="formLabel" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-style"
                autocomplete="off"
                onFocus={e => focus(e)}
                onBlur={e => focusOut(e)}
              />
            </div>
          )}
          <div class="form-item">
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-style"
              autocomplete="off"
              onFocus={e => focus(e)}
              onBlur={e => focusOut(e)}
            />
          </div>
          <div class="form-item">
            <label className="formLabel" htmlFor="passwd">
              Password
            </label>
            <input
              type="password"
              name="passwd"
              className="form-style"
              onFocus={e => focus(e)}
              onBlur={e => focusOut(e)}
            />
            <p>
              <a href="#">
                <small onClick={() => alert("Too bad, idk either")}>
                  Forgot Password ?
                </small>
              </a>
            </p>
          </div>
          <div class="form-item">
            <p class="pull-left">
              {state === "login" ? (
                <a href="/signup">
                  <small>Register</small>
                </a>
              ) : (
                <a href="/login">
                  <small>Log In</small>
                </a>
              )}
            </p>
            {state === "login" ? (
              <input type="submit" class="login pull-right" value="Log In" />
            ) : (
              <input type="submit" class="login pull-right" value="Sign Up" />
            )}
            <div class="clear-fix"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
