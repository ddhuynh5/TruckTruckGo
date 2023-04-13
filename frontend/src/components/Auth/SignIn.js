import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { login, saveCookies, getRoleName } from './AuthHelper';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stored, setStored] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const changePage = () => {
    window.location = '/home';
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.getElementById("InputUsername").value;
    const password = document.getElementById("InputPassword").value;

    try {
      const response = await login(username, password);

      saveCookies({
        email: response[0].fields.email,
        role: getRoleName(response[0].fields.role_id),
        firstName: response[0].fields.first_name,
        lastName: response[0].fields.last_name,
        sessionId: response[0].fields.session_id,
        expiration: response[0].fields.expiration_time,
        uniqueId: response[0].pk,
        remember: rememberMe
      });
      changePage();
    } catch (error) {
      if (error && error["Login Attempts Remaining"]) {
        alert(`Incorrect password. Login attempts remaining: ${error["Login Attempts Remaining"]}`);
      } else if (error && error["error"]) {
        alert(error["error"]);
      } else {
        console.error(error);
        alert("An error occurred while logging in.");
      }
    }
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const hidePass = () => {
    var x = document.getElementById("InputPassword");
    if (x.type === "password") {
      x.type = "text";
    }
    else {
      x.type = "password";
    }
  }

  // Check for remember me on mount
  React.useEffect(() => {
    setStored(Cookies.get('remember'));
    if (Boolean(stored))
      changePage();
  }, []);

  return (
    <div className='wrapper'>
      <div className="banner"><h1>Scrummy Bears Driving</h1></div>
      <div className="container">
        <form>
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="InputUsername">Email</label>
            <input
              type="username"
              className="form-control"
              id="InputUsername"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button" onClick={handleLogin}>
            Login
          </button>
          <div>
            <input type="checkbox" onClick={hidePass} /> Show Password
          </div>
          <div>
            <input type="checkbox" id="rememberMeCheck" checked={Boolean(stored)} onChange={handleRememberMeChange} /> Remember Me?
          </div>
          <div className="msg">
            <span id="msg"></span>
            <br />
          </div>
          <p><a href="ForgotPass">Forgot Password?</a></p>
          <p><a href="signup">Don't have an account?</a></p>
        </form>
      </div>
    </div>
  );
}