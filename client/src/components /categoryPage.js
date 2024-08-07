import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/categorypage.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-cards">
        {categories.map(category => (
          <Link
            to={`/categories/${category.id}/meals`}
            className="category-card"
            key={category.id}
          >
            <img src={category.image} alt={category.category_name} />
            <h2>{category.category_name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
