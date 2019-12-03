import React from 'react';

import LoginForm from '../../components/LoginForm'

function Login({ loginFunction }) {
  return (
    <div className="Login">
      <h1>Login</h1>
      <LoginForm state="login" submitFunction={loginFunction} />
    </div>
  );
}

export default Login;
