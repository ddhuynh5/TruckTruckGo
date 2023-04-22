import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { login, saveCookies, getRoleName } from './AuthHelper';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stored, setStored] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changePage = () => {
    window.location = '/home';
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.getElementById("InputUsername").value;
    const password = document.getElementById("InputPassword").value;

    try {
      const response = await login(username, password);
      setIsLoading(true);

      saveCookies({
        email: response[0].fields.email,
        role: getRoleName(response[0].fields.role_id),
        name: response[0].name,
        sessionId: response[0].fields.session_id,
        expiration: response[0].fields.expiration_time,
        uniqueId: response[0].pk,
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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      Cookies.set('remember', true);
    } else {
      Cookies.remove('remember');
    }
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
    const remember = Cookies.get('remember');
    if (remember !== undefined) {
      setStored(remember === "true");
      setRememberMe(true);
    }
    if (stored) {
      changePage();
    }
  }, [stored]);

  return (
    <div className="wrapper py-5">
      <div className="container">
        <form>
          <h2>Sign In</h2>
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          {!isLoading && (
            <>
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
                Log in
              </button>
              <div>
                <input type="checkbox" onClick={hidePass} /> Show Password
              </div>
              <div className='mb-4'>
                <input type="checkbox" id="rememberMeCheck" checked={rememberMe} onChange={handleRememberMeChange} /> Remember Me?
              </div>
              <p style={{
                marginBottom: "0"
              }}><a href="ForgotPass">Forgot Password?</a></p>
              <p><a href="signup">Don't have an account?</a></p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}