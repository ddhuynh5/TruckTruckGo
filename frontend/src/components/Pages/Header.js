import '../../App.css';

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { points, getCart, removeFromCart, Divider } from './PagesHelper';
import { logout } from '../Auth/AuthHelper';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { SiGithubsponsors } from 'react-icons/si';
import { HiOutlineSparkles, HiOutlineCog } from 'react-icons/hi';
import { RxHamburgerMenu } from 'react-icons/rx';
import GummyBear from '../../assets/images/gummy-bear.png';
import CheckoutPage from './CheckOut.js';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header(props) {
    const searchInputRef = useRef(null);

    const [showCart, setShowCart] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const [keywords, setKeywords] = useState("");
    const [totalPoints, setTotalPoints] = useState("");
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [cartQuant, setCartQuant] = useState("");

    const [cartItems, setCartItems] = useState([]);

    const [cartTotal, setCartTotal] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const getMyCart = async () => {
        const items = await getCart(id);
        if (items && Array.isArray(items)) {
            setCartQuant(items.length);
        } else {
            setCartQuant(0);
        }
        setCartItems(items);
    }

    useEffect(() => {
        const name = Cookies.get('name');
        const id = Cookies.get('uniqueId');
        const role = Cookies.get('role');
        setId(id);
        setRoleId(role);
        setFullName(name);
    }, []);

    useEffect(() => {
        if (roleId !== "Driver")
            return;

        const getPoints = async () => {
            const pointData = await points(id);
            setTotalPoints(pointData[0].total_points);
        }

        if (roleId === "Driver") {
            getMyCart();
            getPoints();
        }
    }, [id, roleId]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("searchTerm");

        if (searchTerm) {
            setKeywords(searchTerm);
        }

    }, [location]);

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchTerm = searchInputRef.current.value;
        if (searchTerm) {
            setKeywords(searchTerm);
            navigate(`/home?searchTerm=${searchTerm}`);
            if (location.pathname === "/home") {
                props.SearchCatalog(searchTerm);
            }
        }
        else return;
    };

    const handleClick = () => {
        props.handleShowCheckout(true);
    };

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            const response = await logout();
            if (response.status >= 200 && response.status < 300) {
                console.log("Logout successful");
                navigate(`/`);
                if (location.pathname === "/")
                    window.location.reload(true);
            }
        }
    }

    const handleLogin = () => {
        navigate("/signin");
    }

    const handleCheckout = () => {
        setShowCheckout(true);
        setShowCart(false);
    }

    const handleClose = () => {
        setShowCheckout(false);
        props.handleShowCheckout(false);
    };

    const handleRemoveFromCart = async (itemID) => {
        const response = await removeFromCart(id, itemID);
        if (response.data.success) {
            setShowCheckout(false);
            props.handleShowCheckout(false);
            window.location.reload();
        }
    }

    const calculateTotal = () => {
        const totalPrice = cartItems.reduce((accumulator, item) => accumulator + (item.Price * item.Quantity), 0);
        setCartTotal(totalPrice);
    }

    return (
        <Navbar key={false} bg="light" expand={false} sticky="top">
            <Container fluid className="d-flex justify-content-center">
                <RxHamburgerMenu onClick={() => setShowNav(true)} className='nav-button ms-2' style={{ fontSize: "2rem" }} />
                <img
                    src={GummyBear}
                    alt="Logo"
                    className='ms-4'
                    style={{
                        width: '3%',
                        minWidth: '40px',
                        maxWidth: '40px',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/`)}
                />
                <Navbar.Offcanvas
                    show={showNav}
                    onHide={() => setShowNav(false)}
                    id={`offcanvasNavbar-expand-${false}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                            {fullName}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/home" style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                                <AiOutlineHome style={{ marginRight: "8px" }} />Home
                            </Nav.Link>
                            <Nav.Link href="/sponsors" style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                                <SiGithubsponsors style={{ marginRight: "8px" }} />Sponsors
                            </Nav.Link>
                            {roleId === "Driver" && (
                                <>
                                    <Nav.Link href="/points" style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                                        <HiOutlineSparkles style={{ marginRight: "8px" }} />Points: {totalPoints}
                                    </Nav.Link>
                                </>
                            )}
                            <Nav.Link href="/settings" style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
                                <HiOutlineCog style={{ marginRight: "8px" }} />Settings
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                    {roleId && id && (
                        <>
                            <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <button onClick={handleLogout}>Logout</button>
                            </Offcanvas.Body>
                        </>
                    )}
                    {!roleId && !id && (
                        <>
                            <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <button onClick={handleLogin}>Log in</button>
                            </Offcanvas.Body>
                        </>
                    )}
                </Navbar.Offcanvas>
                {roleId === "Driver" && (
                    <>
                        <Offcanvas
                            show={showCart}
                            onHide={() => setShowCart(false)}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Cart ({cartQuant})</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Divider />
                            <Offcanvas.Body>
                                {cartItems.reduce((accumulator, item) => {
                                    const existingItemIndex = accumulator.findIndex(cartItem => cartItem.ItemID === item.ItemID);
                                    if (existingItemIndex >= 0) {
                                        accumulator[existingItemIndex].Quantity += item.Quantity;
                                    } else {
                                        accumulator.push({ ...item });
                                    }
                                    return accumulator;
                                }, []).map((item) => (
                                    <div key={item.ItemID}>
                                        <img src={item.ImageURL} />
                                        <h5>{item.ItemName}</h5>
                                        <p>Price: {item.Price}</p>
                                        <p>Quantity: {item.Quantity}</p>
                                        <button onClick={() => handleRemoveFromCart(item.ItemID)}>Remove</button>
                                    </div>
                                ))}
                                <Divider />
                                <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <button
                                        onClick={() => {
                                            handleCheckout();
                                            handleClick();
                                        }}
                                    >
                                        Checkout ({cartQuant}): ${cartTotal.toFixed(2)}
                                    </button>
                                </Offcanvas.Body>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </>
                )}
                <div className="d-flex justify-content-center" style={{ margin: '0 auto' }}>
                    <Form onSubmit={handleSearch} style={{ width: '75rem', marginLeft: '5rem' }}>
                        <Form.Control
                            type="search"
                            placeholder="Search Products"
                            className="me-2 mb-2 search-input"
                            aria-label="Search Products"
                            ref={searchInputRef}
                            defaultValue={keywords ? keywords : ""}
                        />
                    </Form>
                </div>
                {roleId === "Driver" && (
                    <>
                        <AiOutlineShoppingCart
                            onClick={() => {
                                setShowCart(true);
                                getMyCart();
                            }}
                            className='nav-button ms-auto me-2'
                            style={{ fontSize: "2rem" }}
                        />
                        {cartQuant > 0 && <span>{cartQuant}</span>}
                    </>
                )}
                {!roleId && !id && (
                    <button
                        onClick={handleLogin}
                        style={{
                            marginLeft: 'auto',
                            marginRight: '2rem',
                            width: '100px',
                            height: '50px'
                        }}
                        className='hide'
                    >
                        Log in
                    </button>
                )}
                {showCheckout && (<CheckoutPage cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} handleClose={handleClose} points={totalPoints} id={id} cartTotal={cartTotal} />)}
            </Container>
        </Navbar>
    );
}

export default Header;
