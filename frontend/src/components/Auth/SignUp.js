import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    setNameError(false);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setSubmitted(false);

    if (!emailValue.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setSubmitted(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else if (nameError || emailError || passwordError) {
      setError(true);
    } else {
      axios.post('/api/register', { name, email, password })
        .then(res => {
          setSubmitted(true);
          setError(false);
          document.cookie = `authToken=${res.data.token}; path=/`;
          window.location = '/home';
        })
        .catch(err => {
          console.error(err);
          setError(true);
        });
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <p>User {name} successfully registered!!</p>
      </div>
      
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <p>Please enter all the fields correctly</p>
      </div>
    );
  };

  return (
    <div className = "wrapper">
      <div class="banner">
        <h1>Route Rewards</h1>
      </div>
      <div class="container">
          <form name = "Sign Up"> 
            <h2>User Registration</h2>
              <div className="messages">
                {errorMessage()}
                {successMessage()}
              </div>

              <label for="name"><b>Name</b></label>
              <input
                onChange={handleName}
                className="input"
                value={name}
                type="text"
              />

              <label for="email"><b>Email</b></label>
              <input
                onChange={handleEmail}
                className="input"
                value={email}
                type="text"
              /> {emailError && (<div class="error">Please enter a valid email address</div>)}
              <label for="password"><b>Password</b></label>
              <input
                onChange={handlePassword}
                className="input"
                value={password}
                type="password"
              /> {passwordError && (<div class="error">Password must be at least 8 characters long and contain at least
                  one capital letter and one number</div>)}

              <p><a href="SignIn">Already have an account?</a></p>

              <button onClick={handleSubmit} class="signupbtn" type="button"> Sign Up </button>
          </form>
      </div>
    </div>
  );
}
