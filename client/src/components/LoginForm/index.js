import React from 'react';

export default function LoginForm({ state, submitFunction }) {
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
