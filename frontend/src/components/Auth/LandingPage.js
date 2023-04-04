import React, { useState } from 'react';

export default function LandingPage() {
    const changePage = () => {
        window.location = '/signin';
    };

    const changePage2 = () => {
        window.location = '/signup';
    };

    return (
        <div className='wrapper'>
            <h1 className="banner">Route Rewards</h1>
            <div className="container">
                <p className="landing">Earn points from our sponsors and get rewarded for your good driving! Sign up today!</p>
                <button className="button" onClick={changePage}>Sign In</button>
                <button className="button" onClick={changePage2}>Sign Up</button>
                <p className="landing">Some of our sponsors:</p>
                <ul className="images">
                    <li>Nike <img src="img/nike.jpg"></img></li>
                    <li>Apple</li>
                    <li>Goodwill</li>
                    <li>Lowes</li>
                    <li>Bass Pro Shops</li>
                    <li>Doofenshmirtz Evil Inc.</li>
                </ul>
                <img src="img/nike.jpg"></img>
                <p className="landing">Join today and start getting rewarded for your drives!</p>
            </div>
        </div>
    );
}