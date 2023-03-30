import React, { useState } from 'react';
import SignUp from './SignUp';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, loginAttempts] = useState(3);

  const changePage = () => {
    window.location = '/home';
  };

  const handleLogin = () => {
    const username = document.getElementById("InputUsername").value;
    const password = document.getElementById("InputPassword").value;

    if (username === "" || password === "") {
      alert("Please fill out the required fields!");
    } else {
      const userAuth = {
        "admin": "admin_token", // For testing purposes only
        "jane_doe": generateToken(), // Replace with actual user token
        "john_smith": generateToken() // Replace with actual user token
      };
      if (userAuth.hasOwnProperty(username) && userAuth[username] === password) {
        // Set authentication cookie with user token on successful login
        Cookies.set('authToken', userAuth[username], { expires: 7 });
        changePage();
        alert("Login successful");
      } else {
        loginAttempts(attempts - 1);
        document.getElementById("msg").innerHTML = "<center className='text-danger'>Invalid username or password</center>";
        alert("You have " + attempts + " login attempts remaining;");
        if (loginAttempts === 0) {
          document.getElementById("InputUsername").disabled = true;
          document.getElementById("InputPassword").disabled = true;
          document.getElementById("submit").disabled = true;
        }
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
    if (authToken) {
      // Authenticate user based on authToken...
      changePage();
    }
  }, []);

  return (
    <div className='wrapper'>
      <div className="banner"><h1>Route Rewards</h1></div>
      <div className="container">
        <form>
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="username"
              className="form-control"
              id="InputUsername"
              placeholder="Enter Username"
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
          <input type="checkbox" onClick={hidePass} />Show Password
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