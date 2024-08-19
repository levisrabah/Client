import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../styles/categorypage.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying if a token exists
    const token = localStorage.getItem('token');
    if (!token) {
      // If not logged in, redirect to the login page
      navigate('/login');
    } else {
      // If logged in, fetch categories
      fetch('https://blaze-server-1xqz.onrender.com/categories')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="category-cards">
          {categories.map(category => (
            <Link to={`/categories/${category.id}/meals`} key={category.id} className="category-card-link">
              <div className="category-card">
                <img src={category.image} alt={category.category_name} />
                <h2>{category.category_name}</h2>
                <div className="description">
                  <p>{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
