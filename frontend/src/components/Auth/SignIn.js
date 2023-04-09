import React, { useState } from 'react';
import SignUp from './SignUp';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { login, saveCookies, getRoleName } from './AuthHelper';
import RememberMe from './RememberMe';
import { rememberMeState } from './RememberMe';
import Navbar from '../Pages/Navbar';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changePage = () => {
    window.location = '/home';
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.getElementById("InputUsername").value;
    const password = document.getElementById("InputPassword").value;

    try {
      const response = await login(username, password);

      if (rememberMeState == true) {
        saveCookies({
          email: response[0].fields.email,
          role: getRoleName(response[0].fields.role_id),
        });
      }
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

  const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, 'secret_key').toString();
    return encryptedData;
  }

  const decrypt = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret_key').toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  const generateToken = () => {
    // Generate a random token for the user
    return btoa(Math.random().toString(36).substr(2, 10));
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

  // Check for authentication cookie on mount
  React.useEffect(() => {
    const authToken = Cookies.get('authToken');
    const emailCookie = Cookies.get('email');
    const roleCookie = Cookies.get('role');
    if (authToken && emailCookie && roleCookie) {
      // Authenticate user based on authToke...
      changePage();
    }
  }, []);

  return (
    <div className='wrapper'>
      <Navbar />
      <div className="banner"><h1>Route Rewards</h1></div>
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
            <RememberMe />
          </div>
          <div className="msg">
            <span id="msg"></span>
            <br />
          </div>
          <p><a href="ForgotPass">Forgot Password?</a></p>
          {/* <p><a href="ForgotEmail">Forgot Email?</a></p> */}
        </form>
      </div>
    </div>
  );
}