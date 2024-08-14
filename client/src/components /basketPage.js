import React, { useState, useEffect } from 'react';
import '../styles/basket.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const BasketPage = ({ basketItems = [], handleQuantityChange }) => {
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showNamePopup, setShowNamePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [basketItems]);

  const handleConfirmOrder = async () => {
    if (userName.trim() === '' || phoneNumber.trim() === '') {
      setShowNamePopup(true);
      return;
    }

    try {
      // First, create the transaction
      const newTransaction = {
        userName: userName,
        date: new Date().toISOString().split('T')[0],
        items: basketItems.map(item => item.name),
        total: total,
      };

      const transactionResponse = await fetch('http://127.0.0.1:5555/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!transactionResponse.ok) {
        throw new Error('Failed to add transaction');
      }

      // Then, initiate the M-Pesa payment
      const paymentResponse = await fetch('http://127.0.0.1:5555/make_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the JWT token in localStorage
        },
        body: JSON.stringify({
          phone_number: phoneNumber,  // The phone number where the STK Push will be sent
          amount: total,
        }),
      });

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        console.log('Payment initiated:', paymentData);
        setShowReceipt(true);
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  const Receipt = () => (
    <div className="receipt-popup">
      <h2>Order Receipt</h2>
      <p><strong>Customer Name:</strong> {userName}</p>
      <p><strong>Phone Number:</strong> {phoneNumber}</p>
      <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
      <h3>Ordered Items:</h3>
      <ul>
        {basketItems.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>A payment request has been sent to your phone. Please complete the M-Pesa payment.</p>
      <button onClick={() => {
        setShowReceipt(false);
        navigate('/order'); 
      }}>Ok</button>
    </div>
  );

  const NamePopup = () => (
    <div className="name-popup-overlay">
      <div className="name-popup">
        <h3>Please Enter Your Details</h3>
        <input 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          placeholder="Your Name" 
        />
        <input 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          placeholder="Your Phone Number" 
        />
        <button onClick={() => setShowNamePopup(false)}>Close</button>
      </div>
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
              <input 
                type="tel" 
                placeholder="Enter your phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button onClick={handleConfirmOrder}>Confirm Order and Pay</button>
            </div>
          </>
        ) : (
          <div className="empty-basket">Your basket is empty</div>
        )}
      </div>
      {showReceipt && <Receipt />}
      {showNamePopup && <NamePopup />}
    </div>
  );
};

export default BasketPage;
