import React, { useState, useEffect } from 'react';
import '../styles/basket.css';
import Navbar from './navbar';

const BasketPage = ({ basketItems = [], handleQuantityChange }) => {
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const newTotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [basketItems]);

  const handleConfirmOrder = () => {
    if (userName.trim() === '') {
      alert('Please enter your name before confirming the order.');
      return;
    }
    setShowReceipt(true);
  };

  const Receipt = () => (
    <div className="receipt-popup">
      <h2>Order Receipt</h2>
      <p><strong>Customer Name:</strong> {userName}</p>
      <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
      <h3>Ordered Items:</h3>
      <ul>
        {basketItems.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowReceipt(false)}>Close</button>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-heading">
          <div className="basket-heading">Basket</div>
          <div className="divider"></div>
          <div className="basket-icon"></div>
        </div>
        {basketItems.length > 0 ? (
          <>
            {basketItems.map(item => (
              <div key={item.id} className="product-item">
                <img src={item.image} alt={item.name} className="product-image" />
                <div className="product-info">
                  <div className="product-name">{item.name}</div>
                  <div className='product-description'>{item.description}</div>
                  <div className="product-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="input-field">
                  <span>{item.quantity}</span>
                  <div className="icon" onClick={() => handleQuantityChange(item.id, -1)}>-</div>
                  <div className="icon" onClick={() => handleQuantityChange(item.id, 1)}>+</div>
                </div>
              </div>
            ))}
            <div className="transaction-form">
              <h2>Order Summary</h2>
              <p><strong>Total: ${total.toFixed(2)}</strong></p>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
          </>
        ) : (
          <div className="empty-basket">Your basket is empty</div>
        )}
      </div>
      {showReceipt && <Receipt />}
    </div>
  );
};

export default BasketPage;