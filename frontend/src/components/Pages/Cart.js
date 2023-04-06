import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

export default function Cart() {

return(
    <div className='wrapper'>
        <h1 class='banner'>Route Rewards</h1>
        <div className="container">
            <header class="section-header">
                <Navbar loc1 = "changePageHome"></Navbar>
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