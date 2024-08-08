import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from './Mealcard';
import Navbar from './navbar';
function Menu() {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/categories/${id}/meals`)
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      <Navbar />
      <h1>Menu</h1>
      {meals.map(meal => (
        <MealCard key={meal.id} {...meal} />
      ))}
    </div>
  );
}

export default Menu;
