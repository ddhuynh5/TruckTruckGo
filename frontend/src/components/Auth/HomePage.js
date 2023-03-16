import styles from '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function HomePage() {

const changePage = () => {
    window.location='/accountsettings';
};

const changePage2 = () => {
    window.location='/accountsettings';
};

return(
    <div className='wrapper'>
        <h1 class='banner'>Route Rewards</h1>
        <div className="container">
            <h2>Home Page</h2>
            <button onClick={changePage} class="homepagebtn" > Settings </button>
            <button class="homepagebtn" > Catalog </button>
            <button class="homepagebtn" > Profile </button>
            <button class="homepagebtn" > Cart </button>
            <p>What do we want on the home page</p>

            
            
        </div>
    </div>
)
}