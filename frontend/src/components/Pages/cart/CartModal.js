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
            style={{
                content: {
                    margin: '0 auto',
                    marginTop: '65px',
                    width: '800px',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px'
                }
            }}
        >
            <h2>Cart Items</h2>
            <Divider />
            <CartItems items={items} />
            <Divider />
            <CartSummary />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button>Checkout</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
    );
};

export default CartModal;
