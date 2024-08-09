import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();


  const handleHomeClick = () => {
    navigate('/'); // Navigate to the WelcomePage
  };

  return (
    <div className="errorPage">
      <div className="errorContent">
        <div className="errorCode">404</div>
        <div className="errorMessage">
          Page not found
          <br />
          The page you are looking for doesn't exist or another error occurred
          <br />
          Go back or click the button below to choose a new direction
        </div>
        <div className="homeButtonContainer">
          <div className="homeButton" onClick={handleHomeClick}>
            Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;