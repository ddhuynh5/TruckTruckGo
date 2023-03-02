import React, { useState } from 'react';
import styles from '../../App.css';

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

const changePage = () => {
    window.location='';
};



return (
    
    
    <div className="container">
        <body>
        <h1 className="title">Good Driver Incentive Program</h1>
        <p className="headLog">Already have an account?</p>

        <button type="submit" className="btn" onClick={changePage}>
        Sign In
        </button>
        <button type="submit" className="startBtn" onClick={changePage}>
        Get started
        </button>
        <p className="bodyText">Get rewarded for your good driving!</p>
        </body>
    </div>
);
}