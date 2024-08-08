import React from 'react';
import '../styles/basket.css';
import Navbar from './navbar';

const BasketPage = ({basketItems = [], handleQuantityChange }) => {
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
          basketItems.map(item => (
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
          ))
        ) : (
          <div className="empty-basket">Your basket is empty</div>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
