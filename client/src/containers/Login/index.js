import React from 'react';

import LoginForm from '../../components/LoginForm'

function Login({ loginFunction }) {
  return (
    <div className="Login">
      <div className="login-register-background"></div>
      <LoginForm state="login" submitFunction={loginFunction} />
    </div>
  );
}

export default Login;
