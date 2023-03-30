import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function HomePage() {

    const changePageSettings = () => {
        window.location = '/accountsettings';
    };
    const changePageHome = () => {
        window.location = '/cart';
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
                                <li className="nav-item"><a className="nav-link" href="#" onClick={changePageHome} data-abc="true">My Cart</a></li>
                            </ul>
                            <ul className="navbar-nav d-flex align-items-center">
                                <li className="nav-item">
                                    <div className="d-flex flex-row">
                                        <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" className="rounded-circle" width="30"></img>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a href="#" onClick={changePageSettings} className="nav-link d-flex align-items-center" data-abc="true"><span>Truck Driver</span><i className='bx bxs-chevron-down'></i></a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <section className="header-main border-bottom bg-white">
                        <div className="container-fluid">
                            <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                                <div className="col-md-8">
                                    <div className="d-flex form-inputs">
                                        <input className="searchBar" type="text" placeholder="Search any product..."></input>
                                        <button className="searchButton">Search</button>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="d-flex flex-column ms-2">
                                        <span className="qty">3 items in cart</span>
                                        <span className="fw-bold">4000 Points</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a className="nav-link" href="#search+electronics">Electronics</a></li>
                                <li className="nav-item"><a className="nav-link" href="#search+clothes">Clothes</a></li>
                                <li className="nav-item"><a className="nav-link" href="#search+furniture">Furniture</a></li>
                                <li className="nav-item"><a className="nav-link" href="#search+phones">Phones</a></li>
                                <li className="nav-item"><a className="nav-link" href="#search+shoes">Shoes</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <div className="container">
                    <p className="homepagetxt">New Products</p>
                    <ul className="images">
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                    </ul>
                    <ul className="images">
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                    </ul>
                    <ul className="images">
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></li>
                        <li> Sample Product <img src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                        <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}