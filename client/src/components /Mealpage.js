import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/mealpage.css';
import Navbar from './navbar';

function MealPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/meals/${id}`)
      .then(response => response.json())
      .then(data => setMeal(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Meal added to cart:', meal);
  };

  return (
    <div className="meal-page">
      <Navbar /> {/* Include Navbar here */}
      <img src={meal.image} alt={meal.name} />
      <div className="meal-details">
        <h1 id='name'>{meal.name}</h1>
        <h2 id='category'>This is one of our {meal.category}</h2>
        <p id='topic'>Description</p>
        <p id='description'>-{meal.description}</p>
        <p id='price'>Price: ${meal.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MealPage;
