import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Cart() {

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

                <div className="card">
                    <div className="col-md-2">
                        <div className="d-flex flex-column ms-2">
                            <span className="qty">3 items in cart</span>
                            <span className="fw-bold">Account Balance: 4000 Points</span>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></div>
                            <div className="col">
                                <div className="row text-muted">Gummy Bear</div>
                                <div className="row">Red</div>
                            </div>
                            <div className="col">400 points</div>
                        </div>
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></div>
                            <div className="col">
                                <div className="row text-muted">Gummy Bear</div>
                                <div className="row">Blue</div>
                            </div>
                            <div className="col">400 points</div>
                        </div>
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></div>
                            <div className="col">
                                <div className="row text-muted">Gummy Bear</div>
                                <div className="row">Green</div>
                            </div>
                            <div className="col">400 points</div>
                        </div>
                    </div>
                    <div className="col-md-4 summary">
                        <div className="row">
                            <div className="col">Items: 3</div>
                        </div>
                        <div className="row">
                            <div className="col">Total Price</div>
                            <div className="col">1200 Points</div>
                        </div>
                        <button className="btncheckout">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}