import React from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomePage.css';
import videoBg from '../styles/video.mp4'

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleBrowseShop = () => {
    const isLoggedIn = false; 

    if (isLoggedIn) {
      navigate('/category');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="welcome-container">
      <Navbar />
      <div className='main'>
          <video autoPlay muted loop className="welcome-video">
            <source src={videoBg} type="video/mp4" />
          </video>
          </div>
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Blaze</h1>
        <h2 className="welcome-subtitle">Blaze restaurant</h2>
        <p className="welcome-description">
          Welcome to Blaze, where culinary excellence meets a vibrant, welcoming atmosphere. 
          At Blaze, we take pride in crafting unforgettable dining experiences with our bold, 
          flavorful dishes that ignite your senses. Our menu features a tantalizing fusion of 
          contemporary and classic cuisines, using only the freshest, locally-sourced ingredients. 
          From our signature flame-grilled steaks to our delectable vegetarian options, 
          there’s something to delight every palate.
        </p>
        <div className='browse-shop-button'>
            <button onClick={handleBrowseShop}>
                Browse our shop
            </button>
            </div>
      </div>
      <footer className="footer">
        <div className="footer-section">
          <h3 className="footer-title">LET'S DO IT TOGETHER</h3>
          <p className="footer-link">Become an Admin</p>
          <p className="footer-link">Become a User</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">TOP CATEGORIES: KENYA</h3>
          <p className="footer-link">Pizza</p>
          <p className="footer-link">Beef Burger</p>
          <p className="footer-link">Sandwich</p>
          <p className="footer-link">Choma</p>
          <p className="footer-link">Sea food</p>
          <p className="footer-link">See all categories</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">TERMS & CONDITIONS</h3>
          <p className="footer-link">Privacy Policy</p>
          <p className="footer-link">Cookies Policy</p>
          <p className="footer-link">Compliance</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">FOLLOW US</h3>
          <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-instagram"></i>
            <i className="fa fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;