import '../../App.css';

import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Sponsors() {
    return (
        <div className='wrapper'>
            <Navbar />
            <h1 className='banner'>Route Rewards</h1>
            <div className="container">
                <header className="section-header">
                    <h1>Sponsors</h1>
                </header>
            </div>
        </div>
    )
}