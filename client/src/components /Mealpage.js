import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/mealpage.css';


function MealPage({ addToBasket }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/meals/${id}`)



      .then(response => response.json())
      .then(data => {
        setMeals(data);
        if (data.length > 0) {
          fetch(`http://localhost:5000/categories/${categoryId}`)
            .then(response => response.json())
            .then(category => setCategoryName(category.category_name))
            .catch(error => console.error('Error fetching category:', error));
        }
      })
      .catch(error => console.error('Error fetching meals:', error));
  }, [categoryId]);


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
        <h2 id='category'>This is one of our {meal.category}</h2>
        <p id='topic'>Description</p>
        <p id='description'>-{meal.description}</p>
        <p id='price'>Price: ${meal.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart

      </div>
    </div>
  );
}

export default MealPage;