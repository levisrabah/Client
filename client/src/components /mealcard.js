import react, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mealcard.css';

function MealCard(props) {
    return (
        <div className="meal-card">
            <div className="meal-card-image">
                <img src={props.image} alt={props.name} />
            </div>
            <div className="meal-card-details">
                <h3>{props.name}</h3>
                <p>{props.price}</p>
                <Link to={`/meal/${props.id}`}>View Details</Link>
            </div>
        </div>
    );
}

export default MealCard;