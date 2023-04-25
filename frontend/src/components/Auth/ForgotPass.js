import React, { useState } from 'react';
import axios from 'axios';


export default function ForgotPass() {
    const [email, setEmail] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        const email = document.getElementById("InputEmail").value;
        if (email === "") {
            document.getElementById("msg").innerHTML = "<center class='text'>Please enter an email</center>";
        } else {
            setEmail(email);

            try {
                const response = await axios.post('http://http://ec2-44-198-27-111.compute-1.amazonaws.com/password_reset', { email }, {
                    withCredentials: true
                });
                if (response.data["success"]) {
                    document.getElementById("msg").innerHTML = "<center class='text'>Check your email for a link to reset your password</center>";
                }
            } catch (error) {
                if ((error.response && error.response.status === 400) || error.response.status === 401) {
                    throw error.response.data;
                } else {
                    console.error(error);
                    throw new Error("An error occurred while looking up item(s).");
                }
            }
        }
    }

    return (
        <div className='wrapper'>
            <div className="banner"><h1>Route Rewards</h1></div>
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
                    <button type="button" className="btn-reset" onClick={handleReset}>Reset Password</button>
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