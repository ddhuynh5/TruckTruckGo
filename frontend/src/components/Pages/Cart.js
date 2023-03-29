import styles from '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Cart() {

    const changePageHome = () => {
        window.location='/home';
    };

    const changePageSponsors = () => {
        window.location='/sponsors';
    };

    const changePagePoints = () => {
        window.location='/points';
    };

return(
    <div className='wrapper'>
        <h1 class='banner'>Route Rewards</h1>
        <div className="container">
            <header class="section-header">
                <nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
                    <div class="container-fluid">
                        <ul class="navbar-nav d-none d-md-flex mr-auto">
                            <li class="nav-item"><a class="nav-link" href="#" onClick={changePageSponsors} data-abc="true">Sponsors</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onClick={changePagePoints} data-abc="true">Points</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" onClick={changePageHome} data-abc="true">Home</a></li>
                        </ul>
                        <ul class="navbar-nav d-flex align-items-center">
                            <li class="nav-item">
                                <div class="d-flex flex-row">
                                    <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" class="rounded-circle" width="30"></img>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link d-flex align-items-center" data-abc="true"><span>Truck Driver</span><i class='bx bxs-chevron-down'></i></a>
                            </li>
                        </ul>
                    </div> 
                </nav> 
            </header>

            <div class = "card">
                <div class="col-md-2">
                    <div class="d-flex flex-column ms-2">
                        <span class="qty">3 items in cart</span>
                        <span class="fw-bold">Account Balance: 4000 Points</span>
                    </div>            
                </div>
                <div class="row border-top border-bottom">
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></div>
                        <div class="col">
                            <div class="row text-muted">Gummy Bear</div>
                            <div class="row">Red</div>
                        </div>
                        <div class="col">400 points</div>
                    </div>
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></div>
                        <div class="col">
                            <div class="row text-muted">Gummy Bear</div>
                            <div class="row">Blue</div>
                        </div>
                        <div class="col">400 points</div>
                    </div>
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></div>
                        <div class="col">
                            <div class="row text-muted">Gummy Bear</div>
                            <div class="row">Green</div>
                        </div>
                        <div class="col">400 points</div>
                    </div>
                </div>
                <div class="col-md-4 summary">
                    <div class="row">
                        <div class="col">Items: 3</div>
                    </div>
                    <div class="row">
                        <div class="col">Total Price</div>
                        <div class="col">1200 Points</div>
                    </div>
                    <button class="btncheckout">CHECKOUT</button>
                </div>
            </div>
        </div>
    </div>
)
}