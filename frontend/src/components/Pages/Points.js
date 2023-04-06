import '../../App.css';

import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Points() {
    function PointDisplay(){
        return(
            <div className="col-md-2">
                <div className="d-flex flex-column ms-2">
                    <h1>0 points</h1>
                    <span className="fw-bold">Earn points from good driving</span>
                </div>
            </div>
        );
    }

    return(
        <div className='wrapper'>
            <h1 class='banner'>Route Rewards</h1>
            <div className="container">
                <header class="section-header">
                    <Navbar></Navbar>
                </header>
                <span> </span>
                <div className = "card">   
                    <PointDisplay></PointDisplay>
                </div>
            </div>
        </div>
    )
}