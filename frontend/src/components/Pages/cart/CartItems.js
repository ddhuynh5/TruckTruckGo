import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";





const CartItem = ({ item }) => {
    const [UserID, setUserID] = useState('');

    useEffect(() => {
        const id = Cookies.get('uniqueId');
        setUserID(id);
    }, []);
    const removeFromCart = () => {
        // Make an HTTP POST request to the add_to_cart endpoint with the necessary data
        fetch('http://localhost:8000/cartRemove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                properties: {
                    UserID: UserID,
                },
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Handle success response
            })
            .catch((error) => {
                console.error('There was an error!', error);
                // Handle error response
            });
    };
    return (
        <div>
            <h4>{item.name}</h4>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={removeFromCart}>Remove Item</button>
        </div>
    );
};

const CartItems = ({ items }) => {
    return (
        <div>
            {items.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CartItems;
