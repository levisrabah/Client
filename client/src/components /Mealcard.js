import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mealcard.css';

function MealCard({ id, name, price, image }) {
  return (
    <div className="meal-card">
      <div className="meal-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="meal-card-details">
        <h3>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <Link to={`/meals/${id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default MealCard;