import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { saveCookies } from './AuthHelper';

export let rememberMeState = false;

const RememberMe = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load email and password from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
      rememberMeState = true; // Update the state value
    }
  }, []);

  // Save email and password to local storage if "Remember Me" is checked
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      rememberMeState = true; // Update the state value
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      rememberMeState = false; // Update the state value
    }
  }, [rememberMe, email, password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
    console.log(setRememberMe);
    rememberMeState = event.target.checked; // Update the state value
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call login function with email and password
    // Redirect to dashboard on successful login
  };

  const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, 'secret_key').toString();
    return encryptedData;
  }

  const decrypt = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret_key').toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  return (
    <>
      <input type="checkbox" id="rememcheck" checked={rememberMe} onChange={handleRememberMeChange} /> Remember Me?
    </>
  );
};

export default RememberMe;