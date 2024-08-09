import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../styles/mealpage.css';

function MealPage({ addToBasket }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [mealForm, setMealForm] = useState({});
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
    fetchMeal();
  }, [id]);

  const fetchMeal = async () => {
    try {
      const response = await fetch(`http://localhost:5555/meals/${id}`);
      const data = await response.json();
      setMeal(data);
      setMealForm({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image
      });
    } catch (error) {
      console.error('Error fetching meal:', error);
    }
  };

  const handleFormChange = (e) => {
    setMealForm({
      ...mealForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Adjust as needed
      const response = await fetch(`http://localhost:5555/meals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add this if you use JWT or similar
        },
        body: JSON.stringify(mealForm)
      });
      if (response.ok) {
        setEditing(false);
        fetchMeal(); // Refresh meal details after update
      } else {
        const errorData = await response.json();
        console.error('Failed to update meal:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust as needed
      const response = await fetch(`http://localhost:5555/meals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Add this if you use JWT or similar
        }
      });
      if (response.ok) {
        console.log('Meal deleted');
        navigate('/menu'); // Redirect to menu page after deletion
      } else {
        const errorData = await response.json();
        console.error('Failed to delete meal:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="meal-page">
        {editing ? (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={mealForm.name}
              onChange={handleFormChange}
            />
            <textarea
              name="description"
              value={mealForm.description}
              onChange={handleFormChange}
            />
            <input
              type="number"
              name="price"
              value={mealForm.price}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="image"
              value={mealForm.image}
              onChange={handleFormChange}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <img src={meal.image} alt={meal.name} className="meal-image" />
            <div className="meal-details">
              <h1>{meal.name}</h1>
              <p>{meal.description}</p>
              <p>Price: ${meal.price}</p>
              <button className="add-to-cart-button" onClick={() => addToBasket(meal)}>
                Add to Cart
              </button>
              {role === 'admin' && (
                <div className="edit-delete-buttons">
                  <button className="edit" onClick={() => setEditing(true)}>Edit</button>
                  <button className="delete" onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MealPage;
