import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/mealpage.css';
import Navbar from './navbar';

function MealPage({ addToBasket }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:5555/meals/${id}`)
      .then(response => response.json())
      .then(data => {
        setMeal(data); // Corrected from setMeals to setMeal
        if (data.categoryId) { // Ensure categoryId is available in data
          fetch(`http://localhost:5555/categories/${data.categoryId}`)
            .then(response => response.json())
            .then(category => setCategoryName(category.category_name))
            .catch(error => console.error('Error fetching category:', error));
        }
      })
      .catch(error => console.error('Error fetching meal:', error));
  }, [id]); // Use id as the dependency

  if (!meal) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToBasket(meal);
    console.log('Meal added to cart:', meal);
  };

  return (
    <div className="meal-page">
      <img src={meal.image} alt={meal.name} />
      <div className="meal-details">
        <h1 id='name'>{meal.name}</h1>
        <h2 id='category'>This is one of our {categoryName}</h2> {/* Use categoryName */}
        <p id='topic'>Description</p>
        <p id='description'>-{meal.description}</p>
        <p id='price'>Price: ${meal.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button> {/* Correctly closed button tag */}
      </div>
    </div>
  );
}

export default MealPage;
