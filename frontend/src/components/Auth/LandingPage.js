import styles from '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function LandingPage() {
const changePage = () => {
    window.location='/signin';
};

    const changePage2 = () => {
        window.location = '/signup';
    };



return ( 
    <div className='wrapper'>
        <h1 class="banner">Route Rewards</h1>
        <div className="container">
            <p class = "landing">Earn points from our sponsors and get rewarded for your good driving! Sign up today!</p>
            <button class = "button" onClick={changePage}>Sign In</button>
            <button class = "button" onClick={changePage2}>Sign Up</button>
            <p class = "landing">Some of our sponsors:</p>
            <ul class="images">
            <li>Nike <img src="img/nike.jpg"></img></li>
            <li>Apple</li>
            <li>Goodwill</li>
            <li>Lowes</li>
            <li>Bass Pro Shops</li>
            <li>Doofenshmirtz Evil Inc.</li>
            </ul>
            <p class = "landing">Join today and start getting rewarded for your drives!</p>
        </div>
    </div>
);
}