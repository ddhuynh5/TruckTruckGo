import '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

export default function HomePage() {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        const SearchValue = e.target.value;
        setSearch(SearchValue);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search === '') {
            window.location = '/home';
        } else {
            window.location = '/home#search=' + search;
        }
    };

    function Filter() {
        return (
            <button className="btnfilter">Filter</button>
        );
    }

    function Categories() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#search/category/electronics">Electronics</a></li>
                        <li className="nav-item"><a className="nav-link" href="#search/category/clothes">Clothes</a></li>
                        <li className="nav-item"><a className="nav-link" href="#search/category/furniture">Furniture</a></li>
                        <li className="nav-item"><a className="nav-link" href="#search/category/phones">Phones</a></li>
                        <li className="nav-item"><a className="nav-link" href="#shoes">Shoes</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

    function ProductDisplay() {
        return (
            <ul className="images">
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                <li> Sample Product <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></li>
                <li> Sample Product <img src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
            </ul>
        );
    }

    return (
        <div className='wrapper'>
            <Navbar />
            <h1 className='banner'>Route Rewards</h1>
            <div className="container">
                <header className="section-header">
                    <section className="header-main border-bottom bg-white">
                        <div className="container-fluid">
                            <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                                <div className="col-md-8">
                                    <div className="d-flex form-inputs">
                                        <input className="searchBar" type="text" onChange={handleSearch} placeholder="Search any product..."></input>
                                        <button className="searchButton" onClick={handleSubmit}>Search</button>
                                        <Filter></Filter>
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
                    <Categories></Categories>
                </header>

                <div className="container">
                    <p className="homepagetxt">New Products</p>
                    <ProductDisplay></ProductDisplay>
                    <ProductDisplay></ProductDisplay>
                    <ProductDisplay></ProductDisplay>
                </div>
            </div>
        </div>
    )
}