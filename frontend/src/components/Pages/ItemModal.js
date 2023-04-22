import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from "js-cookie";


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



  

  const addToCart = () => {
    // Make an HTTP POST request to the add_to_cart endpoint with the necessary data
    console.log('add to cart called');
    fetch('http://localhost:8000/cartAdd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          UserID: UserID,
          ItemID: item.itemId,
          Quantity: quantity,
          ItemName: item.title,
          Price: item.sellingStatus.currentPrice.value,
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
    <Modal
      isOpen={isOpen}
      onRequestClose={closeItemModal}
      contentLabel="Shopping Cart"
      style={{
        content: {
          margin: '0 auto',
          marginTop: '65px',
          width: '800px',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
        },
      }}
    >
      <h2>{itemTitle}</h2>
      <Divider />
      <div>
        <img src={itemImage} alt={itemTitle}></img>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Enter quantity
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={addToCart}>Add to cart</button>
        <button onClick={closeItemModal}>Close</button>
      </div>
    </Modal>
  );
};

export default ItemModal;