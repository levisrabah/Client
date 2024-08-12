import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomePage.css';
import videoBg from '../styles/video.mp4';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBrowseShop = () => {
    const isLoggedIn = false; 
    navigate(isLoggedIn ? '/category' : '/register');
  };

  return (
    <div className="blaze-welcome-container">
      <Navbar />
      <div className='blaze-main'>
        <video autoPlay muted loop className="blaze-welcome-video">
          <source src={videoBg} type="video/mp4" />
        </video>
      </div>
      <div className={`blaze-welcome-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="blaze-welcome-title">Welcome to Blaze</h1>
        <h2 className="blaze-welcome-subtitle">Ignite Your Taste Buds</h2>
        <p className="blaze-welcome-description">
          Experience culinary excellence in a vibrant atmosphere. 
          From flame-grilled steaks to delectable vegetarian options, 
          Blaze offers a tantalizing fusion of flavors for every palate.
        </p>
        <button className='blaze-browse-shop-button' onClick={handleBrowseShop}>
          Explore Our Menu
        </button>
      </div>
      <footer className="blaze-footer">
        <div className="blaze-footer-section">
          <h3 className="blaze-footer-title">Join Us</h3>
          <p className="blaze-footer-link">Become an Admin</p>
          <p className="blaze-footer-link">Become a User</p>
        </div>
        <div className="blaze-footer-section">
          <h3 className="blaze-footer-title">Top Categories</h3>
          <p className="blaze-footer-link">Pizza</p>
          <p className="blaze-footer-link">Beef Burger</p>
          <p className="blaze-footer-link">Sandwich</p>
          <p className="blaze-footer-link">Choma</p>
          <p className="blaze-footer-link">Sea food</p>
        </div>
        <div className="blaze-footer-section">
          <h3 className="blaze-footer-title">Legal</h3>
          <p className="blaze-footer-link">Privacy Policy</p>
          <p className="blaze-footer-link">Terms of Service</p>
          <p className="blaze-footer-link">Compliance</p>
        </div>
        <div className="blaze-footer-section">
          <h3 className="blaze-footer-title">Connect</h3>
          <div className="blaze-social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;