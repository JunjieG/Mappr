import React from 'react';

import SignUpForm from '../../components/LoginForm'

function SignUp({ signupFunction }) {
  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <SignUpForm state="register" submitFunction={signupFunction} />
    </div>
  );
}

export default SignUp;
