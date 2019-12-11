import React from 'react';

import SignUpForm from '../../components/LoginForm'

function SignUp({ signupFunction }) {
  return (
    <div className="SignUp">
      <div className="login-register-background"></div>
      <SignUpForm state="register" submitFunction={signupFunction} />
    </div>
  );
}

export default SignUp;
