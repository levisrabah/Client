import React from 'react';
import Navbar from './navbar';


const WelcomePage = () => {

  return (
    <div 
    className="welcome-container">
      <Navbar />
      <div className="welcome-content">
        <h1>Welcome to Blaze</h1>
        <div className="button-container">
          <h2>Blaze restaurant</h2>
          <p>Welcome to Blaze, where culinary excellence meets a vibrant, welcoming atmosphere. At Blaze, we take pride in crafting unforgettable dining experiences with our bold, flavorful dishes that ignite your senses. Our menu features a tantalizing fusion of contemporary and classic cuisines, using only the freshest, locally-sourced ingredients. From our signature flame-grilled steaks to our delectable vegetarian options, there’s something to delight every palate.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;