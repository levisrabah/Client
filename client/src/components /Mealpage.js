import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MealPage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/meals/${mealId}`)
      .then(response => response.json())
      .then(data => setMeal(data))
      .catch(error => console.error(error));
  }, [mealId]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{meal.name}</h1>
      <h2>{meal.category}</h2>
      <p>{meal.description}</p>
      <p>{meal.price}</p>
      <img src={meal.image} alt={meal.name} />
    </div>
  );
}

export default MealPage;
