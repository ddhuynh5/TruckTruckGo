import React from 'react';
import Modal from 'react-modal';
import CartItems from './CartItems';
import CartSummary from './CartSummary';

Modal.setAppElement('#root');

const Divider = () => {
    return <hr style={{ borderTop: '1px solid #000000' }} />;
};

const CartModal = ({ isOpen, closeModal, items }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Shopping Cart"
        >
            <h2>Cart Items</h2>
            <Divider />
            <CartItems items={items} />
            <Divider />
            <CartSummary />
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
};

export default CartModal;
