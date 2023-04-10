import '../../App.css';

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { points } from './PagesHelper';
import CartModal from './cart/CartModal';
import cartIcon from '../../assets/images/shopping-cart.png';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Header(props) {
    const searchInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keywords, setKeywords] = useState("");
    const [totalPoints, setTotalPoints] = useState("");
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const firstName = Cookies.get('firstName');
        const lastName = Cookies.get('lastName');
        const id = Cookies.get('uniqueId');
        setId(id);
        setFullName(firstName + ' ' + lastName);
    }, []);

    useEffect(() => {
        const getPoints = async () => {
            const pointData = await points(id);
            setTotalPoints(pointData[0].total_points);
        }

        if (id) {
            getPoints();
        }
    }, [id]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("searchTerm");

        if (searchTerm) {
            setKeywords(searchTerm);
        }

    }, [location]);

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

    const cartIconStyle = {
        backgroundImage: `url(${cartIcon})`,
        backgroundSize: 'cover',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
    }

    // Static Cart Info
    const items = [
        {
            id: 1,
            name: 'Product 1',
            price: 10.99,
            quantity: 2
        },
        {
            id: 2,
            name: 'Product 2',
            price: 5.99,
            quantity: 1
        },
        {
            id: 3,
            name: 'Product 3',
            price: 3.99,
            quantity: 3
        }
    ];

    const openModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderCartModal = () => {
        if (isModalOpen) {
            return (
                <div>
                    <CartModal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        items={items}
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <Navbar key={false} bg="light" expand={false} sticky="top">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} className="order-0 ms-2" />
                <Navbar.Offcanvas
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
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/sponsors">Sponsors</Nav.Link>
                            <Nav.Link href="/points">Points: {totalPoints}</Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id={`offcanvasNavbarDropdown-expand-${false}`}
                            >
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Form className="d-flex" style={{ margin: '0 auto', marginRight: '200px', width: '50%' }} onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        placeholder="Search Products"
                        className="me-2 mb-2 search-input"
                        aria-label="Search Products"
                        ref={searchInputRef}
                        defaultValue={keywords ? keywords : ""}
                    />
                </Form>
                <button style={cartIconStyle} onClick={openModal} className='nav-button ms-auto me-2' />
                {renderCartModal()}
            </Container>
        </Navbar>
    );
}

export default Header;
