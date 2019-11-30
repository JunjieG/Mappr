import React, { useState, useEffect } from 'react';

import LoginForm from '../../components/LoginForm'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="Login">
      <h1>Login</h1>
      <LoginForm state="login"/>
    </div>
  );
}

export default Login;
