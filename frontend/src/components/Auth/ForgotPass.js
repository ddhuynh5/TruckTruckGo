import React, { useState } from 'react';
export default function ForgotPass() {
    const [email, setEmail] = useState('');

    const handleReset = () => {
        var email = document.getElementById("InputEmail").value;
        if (email === "") {
            document.getElementById("msg").innerHTML = "<center class='text'>Please enter an email</center>";
        } else {
            setEmail(email);
            document.getElementById("msg").innerHTML = "<center class='text'>Check your email for a link to reset your password</center>";
        }
    }


return (
    <div className='wrapper'>
        <div class="banner"><h1>Route Rewards</h1></div>
        <div className="container">
        <form>
        <h2>Forgot Password</h2>
            <div className="form-group">
            <label htmlFor="InputEmail">Email account is registered with:</label>
            <input
                type="email"
                className="form-control"
                id="InputEmail"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <button type="reset" className="btn-reset" onClick={handleReset}>Reset Password</button>
            <p><a href="SignUp">Don't have an account?</a></p>
        </form>
            <div className="msg">
                    <span id="msg"></span>
                    <br />
            </div>
        </div>
    </div>
);
}