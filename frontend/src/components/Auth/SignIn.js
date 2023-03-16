import React, { useState } from 'react';
import SignUp from './SignUp';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, loginAttempts] = useState(3);

    const changePage = () => {
        window.location='/home';
    };

    const handleLogin = () => {
        //console.log('Username:', username);
        //console.log('Password:', password);
        // Add code here to handle the login logic
        var username = document.getElementById("InputUsername").value;
        var password = document.getElementById("InputPassword").value;

        if (username === "" || password === "") {
            alert("Please fill out the required fields!");
        } else {
            if (username === "admin" && password === "admin") {
                changePage();
                alert("Login successful");
            } else {
                loginAttempts(attempts - 1);
                document.getElementById("msg").innerHTML = "<center class='text-danger'>Invalid username or password</center>";
                alert("You have " + attempts + " login attempts remaining;");
                if (loginAttempts === 0) {
                    document.getElementById("inputUsername").disabled = true;
                    document.getElementById("inputPassword").disabled = true;
                    document.getElementById("submit").disabled = true;
                }
            }
        }
    }

    const hidePass = () => {
        var x = document.getElementById("InputPassword");
        if (x.type === "password") {
            x.type = "text";
        }
        else {
            x.type = "password";
        }
    }



return (
    <div className='wrapper'>
        <div class="banner"><h1>Route Rewards</h1></div>
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
            <button type="submit" className="btn btn-primary" class = "button" onClick={handleLogin}>
            Login
            </button>
            <input type="checkbox" onClick={hidePass}/>Show Password
            <div className="msg">
                    <span id="msg"></span>
                    <br />
            </div>
            <p><a href="ForgotPass">Forgot Password?</a></p>
            <p><a href="ForgotEmail">Forgot Email?</a></p>
        </form>
        </div>
    </div>
);
}