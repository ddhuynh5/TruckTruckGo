import React, { useState } from 'react';

export default function SignIn() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // Add code here to handle the login logic
};

const hidePass=()=> {
    var x=document.getElementById("InputPassword");
    if(x.type === "password"){
        x.type="text";
    }
    else{
        x.type="password";
    }
}



return (
    <div className="container">
    <form>
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
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
        Login
        </button>
        <input type="checkbox" onClick={hidePass}/>Show Password
    </form>
    </div>
);
}