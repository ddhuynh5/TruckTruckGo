import styles from '../../App.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Col, Container, Dropdown, ListGroup, Row } from "react-bootstrap";

export default function HomePage() {
    const [search, setSearch] = useState('');

    const changePageSettings = () => {window.location='/accountsettings';};
    const changePageHome = () => {window.location='/cart';};
    const changePageSponsors = () => {window.location='/sponsors';};
    const changePagePoints = () => {window.location='/points';};
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

    function Copyright(props) {
        return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
            Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        );
    }

    function Navbar(){
        return(
            <nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
                <div class="container-fluid">
                    <ul class="navbar-nav d-none d-md-flex mr-auto">
                        <li class="nav-item"><a class="nav-link" href="#" onClick={changePageSponsors} data-abc="true">Sponsors</a></li>
                        <li class="nav-item"><a class="nav-link" href="#" onClick={changePagePoints} data-abc="true">Points</a></li>
                        <li class="nav-item"><a class="nav-link" href="#" onClick={changePageHome} data-abc="true">My Cart</a></li>
                    </ul>
                    <ul class="navbar-nav d-flex align-items-center">
                        <li class="nav-item">
                            <div class="d-flex flex-row">
                                <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" class="rounded-circle" width="30"></img>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a href="#" onClick={changePageSettings} class="nav-link d-flex align-items-center" data-abc="true"><span>Truck Driver</span><i class='bx bxs-chevron-down'></i></a>
                        </li>
                    </ul>
                </div> 
            </nav> 
        );
    }

    function Filter(){
        return(
            <Dropdown>
                <button class="btnfilter">Filter</button>
            </Dropdown>
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
                <Copyright sx={{ pt: 4 }} />
            </container>
        </div>
    </div>
)
}