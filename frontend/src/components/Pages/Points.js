import '../../App.css';

import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Points() {
    function PointDisplay() {
        return (
            <div className="col-md-2">
                <div className="d-flex flex-column ms-2">
                    <h1>0 points</h1>
                    <span className="fw-bold">Earn points from good driving</span>
                </div>
            </div>
        );
    }

    return (
        <div className='wrapper'>
            <Navbar />
            <h1 className='banner'>Route Rewards</h1>
            <div className="container">
                <header className="section-header">
                </header>
                <span> </span>
                <div className="card">
                    <PointDisplay />
                </div>
            </div>
        </div>
    )
}