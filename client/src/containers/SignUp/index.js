import React, { useState, useEffect } from 'react';

import SignUpForm from '../../components/LoginForm'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <SignUpForm state="register" />
    </div>
  );
}

export default SignUp;
