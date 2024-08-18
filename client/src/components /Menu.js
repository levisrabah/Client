import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from './Mealcard'; // Ensure you have this component
import Navbar from './navbar'; // Ensure you have this component
import '../styles/menu.css'; // Ensure you have this CSS file

function Menu() {
  const { id } = useParams(); // Get category ID from URL parameters
  const [meals, setMeals] = useState([]);
  const [creatingMeal, setCreatingMeal] = useState(false);
  const [mealForm, setMealForm] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch meals and user role/token on component mount
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userToken = localStorage.getItem('token');
    setRole(userRole);
    setToken(userToken);
    fetchMeals();
  }, [id]);

  // Fetch meals from the server
  const fetchMeals = async () => {
    try {
      const response = await fetch(`http://localhost:5555/categories/${id}/meals`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      } else {
        console.error('Failed to fetch meals');
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!mealForm.name) {
      newErrors.name = 'Name is required';
    } else if (mealForm.name.length < 3) {
      newErrors.name = 'Name must be at least 3 letters long';
    }

    if (!mealForm.description) {
      newErrors.description = 'Description is required';
    } else {
      const wordCount = mealForm.description.trim().split(/\s+/).length;
      if (wordCount < 10) {
        newErrors.description = 'Description must be at least 10 words long';
      }
    }

    if (!mealForm.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(mealForm.price) || mealForm.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (mealForm.image && !mealForm.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'Image URL must be a valid URL starting with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    setMealForm({
      ...mealForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to add a new meal
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newMeal = {
        ...mealForm,
        category_id: id // Attach the current category ID
      };
      const response = await fetch('http://localhost:5555/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token
        },
        body: JSON.stringify(newMeal)
      });

      if (response.ok) {
        setCreatingMeal(false);
        setMealForm({
          name: '',
          description: '',
          price: '',
          image: ''
        });
        setErrors({});
        fetchMeals(); // Refresh meals after adding a new one
      } else {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          console.error('Failed to add meal:', errorData.message);
        } catch (jsonError) {
          console.error('Failed to parse error response:', errorText);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="menu-page">
      <Navbar />
      <h1>Menu</h1>
      {role === 'admin' && (
        <>
          <button className="add-meal-button" onClick={() => setCreatingMeal(!creatingMeal)}>
            {creatingMeal ? 'Cancel' : 'Add Meal'}
          </button>
          {creatingMeal && (
            <div className="add-meal-form">
              <form onSubmit={handleFormSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={mealForm.name}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={mealForm.description}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.description && <span className="error-text">{errors.description}</span>}
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={mealForm.price}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.price && <span className="error-text">{errors.price}</span>}
                </label>
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="image"
                    value={mealForm.image}
                    onChange={handleFormChange}
                  />
                  {errors.image && <span className="error-text">{errors.image}</span>}
                </label>
                <button type="submit">Add Meal</button>
                <button type="button" onClick={() => setCreatingMeal(false)}>Cancel</button>
              </form>
            </div>
          )}
        </>
      )}
      <div className="meal-list">
        {meals.map(meal => (
          <MealCard key={meal.id} {...meal} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
