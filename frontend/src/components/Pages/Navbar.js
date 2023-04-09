import '../../App.css';
import React, { useState } from 'react';
import CartModal from './cart/CartModal';
import cartIcon from '../../assets/images/shopping-cart.png'

const changePageSettings = () => { window.location = '/accountsettings'; };
const changePageHome = () => { window.location = '/home'; };
const changePageSponsors = () => { window.location = '/sponsors'; };
const changePagePoints = () => { window.location = '/points'; };
const changePageSignIn = () => { window.location = '/signin'; };
const changePageSignUp = () => { window.location = '/signup'; };

export default function Navbar(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                    <h1>Shopping Cart Page</h1>
                    {/* other cart-related components */}
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
        <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav d-none d-md-flex mr-auto">
                    <li className="nav-item"><a className="nav-link" href="#" onClick={changePageHome} data-abc="true">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={changePageSponsors} data-abc="true">Sponsors</a></li>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={changePagePoints} data-abc="true">Points</a></li>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={openModal} data-abc="true">My Cart</a></li>
                </ul>
                <ul className="navbar-nav d-flex align-items-center">
                    <li className="nav-item">
                        <div className="d-flex flex-row">
                            {/* need to either pick an icon that works on white background or change bg color */}
                            <img src={cartIcon} className="rounded-circle" width="30"></img>
                        </div>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={changePageSignIn} data-abc="true">Sign In</a></li>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={changePageSignUp} data-abc="true">Sign Up</a></li>
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
            {renderCartModal()}
        </nav>
    );
}