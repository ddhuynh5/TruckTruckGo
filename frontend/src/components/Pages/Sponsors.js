import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

export default function Sponsors() {
    return(
        <div className='wrapper'>
            <h1 class='banner'>Route Rewards</h1>
            <div className="container">
                <header class="section-header">
                    <Navbar></Navbar>
                </header>
            </div>
        </div>
    )
}