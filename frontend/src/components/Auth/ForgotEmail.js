import React, { useState } from 'react';
export default function ForgotEmail() {
    const [email, setEmail] = useState('');

const handleEmailReset = () => {
    var email = document.getElementById("InputBackupEmail").value;
    if (email === ""){
        document.getElementById("msg").innerHTML="<center class='text'>Please enter an email</center>";
    } else {
        setEmail(email);
        document.getElementById("msg").innerHTML="<center class='text'>Check your backup email for information.</center>";
    }
}


return (
    <div className="container">
    <form>
    <h1>Forgot Email</h1>
        <div className="form-group">
        <label htmlFor="InputBackupEmail">Enter a backup email account:</label>
        <input
            type="email"
            className="form-control"
            id="InputBackupEmail"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <button type="reset" className="btn-reset" onClick={handleEmailReset}>Reset Email</button>
        <p><a href="SignUp">Don't have an account?</a></p>
    </form>
        <div className="msg">
				<span id="msg"></span>
				<br />
        </div>
    </div>
);
}