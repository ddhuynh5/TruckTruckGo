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
            window.location='/home';
        } else {
            window.location= '/home#search='+ search;
        }
    };

    function Filter(){
        return(
            <button class="btnfilter">Filter</button>
        );
    }

    function Categories(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="#search/category/electronics">Electronics</a></li>
                        <li class="nav-item"><a class="nav-link" href="#search/category/clothes">Clothes</a></li>
                        <li class="nav-item"><a class="nav-link" href="#search/category/furniture">Furniture</a></li>
                        <li class="nav-item"><a class="nav-link" href="#search/category/phones">Phones</a></li>
                        <li class="nav-item"><a class="nav-link" href="#shoes">Shoes</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

    function ProductDisplay(){
        return(
            <ul class="images">
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
                <li> Sample Product <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71IQ-aaDVhL.jpg"></img></li>
                <li> Sample Product <img src="https://m.media-amazon.com/images/I/71cFohr-HmL.jpg"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.52.37PM_530x@2x.png?v=1657904015"></img></li>
                <li> Sample Product <img src="https://cdn.shopify.com/s/files/1/0010/5457/2601/products/ScreenShot2022-07-15at12.45.12PM_530x@2x.png?v=1657903564"></img></li>
            </ul>
        );
    }

return(
    <div className='wrapper'>
        <h1 class='banner'>Route Rewards</h1>
        <div className="container">
            <header class="section-header">
                <Navbar></Navbar>
                <section class="header-main border-bottom bg-white">
                    <div class="container-fluid">
                        <div class="row p-2 pt-3 pb-3 d-flex align-items-center">
                            <div class="col-md-8">
                                <div class="d-flex form-inputs">
                                    <input class="searchBar" type="text" onChange={handleSearch} placeholder="Search any product..."></input>
                                    <button class = "searchButton" onClick={handleSubmit}>Search</button>
                                    <Filter></Filter>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="d-flex flex-column ms-2">
                                    <span class="qty">3 items in cart</span>
                                    <span class="fw-bold">4000 Points</span>
                                </div>            
                            </div>
                        </div>
                    </div> 
                </section>
                <Categories></Categories>
            </header>

            <container>
                <p class = "homepagetxt">New Products</p>        
                <ProductDisplay></ProductDisplay>
                <ProductDisplay></ProductDisplay>
                <ProductDisplay></ProductDisplay>
            </container>
        </div>
    </div>
    )
}