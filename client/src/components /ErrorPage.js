import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPage.css';
import Navbar from './navbar';
const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      <Navbar />
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Oops! Page not found</h2>
        <p className="error-message">
          The page you are looking for doesn't exist or another error occurred.
        </p>
        <button className="home-button" onClick={handleHomeClick}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;