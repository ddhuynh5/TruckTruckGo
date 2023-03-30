import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Sponsors() {
    const changePageHome = () => {
        window.location = '/home';
    };

    const changePageSponsors = () => {
        window.location = '/sponsors';
    };

    const changePagePoints = () => {
        window.location = '/points';
    };

    return (
        <div className='wrapper'>
            <h1 className='banner'>Route Rewards</h1>
            <div className="container">
                <header className="section-header">
                    <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
                        <div className="container-fluid">
                            <ul className="navbar-nav d-none d-md-flex mr-auto">
                                <li className="nav-item"><a className="nav-link" href="#" onClick={changePageSponsors} data-abc="true">Sponsors</a></li>
                                <li className="nav-item"><a className="nav-link" href="#" onClick={changePagePoints} data-abc="true">Points</a></li>
                                <li className="nav-item"><a className="nav-link" href="#" onClick={changePageHome} data-abc="true">Home</a></li>
                            </ul>
                            <ul className="navbar-nav d-flex align-items-center">
                                <li className="nav-item">
                                    <div className="d-flex flex-row">
                                        <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" className="rounded-circle" width="30"></img>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link d-flex align-items-center" data-abc="true"><span>Truck Driver</span><i className='bx bxs-chevron-down'></i></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}