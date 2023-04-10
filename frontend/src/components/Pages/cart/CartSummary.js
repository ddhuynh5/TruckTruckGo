import React from 'react';

const CartSummary = () => {
    const items = [
        { id: 1, name: 'Product 1', price: 10.0, quantity: 2 },
        { id: 2, name: 'Product 2', price: 15.0, quantity: 1 },
        { id: 3, name: 'Product 3', price: 5.0, quantity: 3 },
    ];
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default CartSummary;
