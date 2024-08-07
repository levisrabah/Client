import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/mealpage.css';

function MealPage() {
  const { categoryId } = useParams(); // Change `id` to `categoryId`
  const [meals, setMeals] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/categories/${categoryId}/meals`) // Update URL to fetch meals by category
      .then(response => response.json())
      .then(data => {
        setMeals(data);
        if (data.length > 0) {
          // Fetch category name if not included in the meal data
          fetch(`http://localhost:5000/categories/${categoryId}`)
            .then(response => response.json())
            .then(category => setCategoryName(category.category_name))
            .catch(error => console.error('Error fetching category:', error));
        }
      })
      .catch(error => console.error('Error fetching meals:', error));
  }, [categoryId]);

  const handleAddToCart = (meal) => {
    // Implement your add to cart functionality here
    console.log('Add to Cart:', meal);
  };

  return (
    <div className="meal-page">
      {categoryName && <h1>{categoryName}</h1>}
      <div className="meal-cards">
        {meals.length > 0 ? (
          meals.map(meal => (
            <div key={meal.id} className="meal-card">
              <img src={meal.image} alt={meal.name} />
              <div className="meal-details">
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
                <p>Price: ${meal.price}</p>
                <button onClick={() => handleAddToCart(meal)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No meals available for this category.</p>
        )}
      </div>
    </div>
  );
}

export default MealPage;
