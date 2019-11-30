import React, { useState, useEffect } from 'react';

export default function LoginForm({ state }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`/api/users/${state}` , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
    .then((result) => result.json())
      .then((info) => {
        if (info == "auth/invalid-email"){
          console.log('whyyy?')
          setErrorMessage('Invalid EMAIL REEEEEEEEEE!!!!');
        }
      })
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="text" name="email" value={email} onChange={e =>
            setEmail(e.target.value)}/>
        <label for="passwd">Password</label>
        <input type="password" name="passwd" value={password} onChange={e =>
            setPassword(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      {errorMessage} 
    </div>
  );
}
