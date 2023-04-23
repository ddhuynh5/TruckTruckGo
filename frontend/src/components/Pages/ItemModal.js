import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from "js-cookie";
import { currencySymbolMap } from './PagesHelper';
import { addToCart } from './PagesHelper';

const Divider = () => {
  return <hr style={{ borderTop: '1px solid #000000' }} />;
};

const ItemModal = ({ isOpen, closeItemModal, itemImage, itemTitle, item }) => {
  const [quantity, setQuantity] = useState(1);
  const [UserID, setUserID] = useState('');

  useEffect(() => {
    const id = Cookies.get('uniqueId');
    setUserID(id);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeItemModal}
      contentLabel="Item"
      style={{
        content: {
          margin: '0 auto',
          marginTop: '80px',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          position: 'fixed',
          overflow: 'hidden',
        },
      }}
    >
      <h2>{itemTitle}</h2>
      <Divider />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={itemImage} alt={itemTitle} style={{ marginRight: '10px' }} />
        <p>{currencySymbolMap[item.sellingStatus.currentPrice._currencyId]}{Number(item.sellingStatus.currentPrice.value).toFixed(2)}</p>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginRight: '10px' }}>Enter quantity</span>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            width: '50px',
            height: '30px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px'
          }}
        />
        <button onClick={() => addToCart(UserID, item, quantity)}>Add to cart</button>
        <button onClick={closeItemModal}>Close</button>
      </div>
    </Modal>
  );
};

export default ItemModal;