import React, { useState } from 'react';

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

  function Checkbox() {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  }

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
      setSubmitted(true);
      setError(false);
  
      // Check if "Remember Me" checkbox is checked
      const rememberMe = document.getElementById('remember_me').checked;
      console.log('Remember Me:', rememberMe);
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
        <h1>User {name} successfully registered!!</h1>
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
        <h1>Please enter all the fields correctly</h1>
      </div>
    );
  };

  return (
    <>
      <h1>Reached Sign Up Page</h1>
      <div className="form">
        <div>
          <h2>User Registration</h2>
        </div>
        
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={name}
            type="text"
          />

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
          />
          {emailError && (
            <div className="error">Please enter a valid email address</div>
          )}

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />
          {passwordError && (
            <div className="error">
              Password must be at least 8 characters long and contain at least
              one capital letter and one number
            </div>
          )}

           <input type="checkbox" id ="remember_me" />Remember Me

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
          <p><a href="SignIn">Already have an account?</a></p>
        </form>
      </div>
    </>
  );
}
