import React from 'react';

const CartItem = ({ item }) => {
    return (
        <div>
            <h4>{item.name}</h4>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
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
