import React from 'react';

export default function LoginForm({ state, submitFunction }) {
  if (state === 'register') {
    return (
      <div className="LoginForm">
        <form onSubmit={e => submitFunction(e)}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="passwd">Password</label>
          <input type="password" name="passwd" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  return (
    <div className="LoginForm">
      <form onSubmit={e => submitFunction(e)}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="passwd">Password</label>
        <input type="password" name="passwd" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
