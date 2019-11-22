import React, { useState, useEffect } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/api/users/register' , {
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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input type="password" value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {errorMessage} 
    </div>
  );
}

export default App;
