import React, { useState, useEffect, useCallback } from "react";
import { Divider, order } from "./PagesHelper";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const CheckoutPage = ({ cartItems, handleRemoveFromCart, handleClose, points, cartTotal }) => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        if (cartItems.length === 0)
            setEmpty(false);

        const user_id = Cookies.get('uniqueId');
        const mail = Cookies.get('email');
        setId(user_id);
        setEmail(mail);
    }, [cartItems]);

    const handleOrder = useCallback(async (event) => {
        event.preventDefault();
        if (empty && (points >= cartTotal)) {
            const response = await order(id, email, cartTotal, cartItems);
            if (response) {
                toast.success("Order Placed!");
                window.location.reload();
            }
        }
        else if (!empty) {
            toast.error("No Items in Cart");
        }
        else if (points < cartTotal) {
            toast.error("Not Enough Balance");
        }
    }, [id, email, empty, cartItems, cartTotal, points]);

    const totalPrice = cartItems.reduce((accumulator, item) => accumulator + (item.Price * item.Quantity), 0);

    return (
        <div className="container">
            <h1>Order Summary</h1>
            <Divider />
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
                    <img src={item.ImageURL} alt={item.ItemName} />
                    <h5>{item.ItemName}</h5>
                    <p>Price: {item.Price}</p>
                    <p>Quantity: {item.Quantity}</p>
                    <button onClick={() => handleRemoveFromCart(item.ItemID)}>Remove</button>
                </div>
            ))}
            <Divider />
            <h3>Total: {totalPrice} Points</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={handleOrder}>Place Order</button>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default CheckoutPage;
