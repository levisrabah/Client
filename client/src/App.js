import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components /WelcomePage';
import './App.css';
import MealPage from './components /Mealpage';
import LoginPage from './components /authenticaton/loginpage';
import RegisterPage from './components /authenticaton/registerPage';
import Menu from './components /Menu';
import BasketPage from './components /basketPage';
import CategoryPage from './components /categoryPage';
import DailyOffer from './components /DailyOffer';
import ErrorPage from './components /ErrorPage';

import Transaction from './components /Transactions';
import { TransactionProvider } from './components /TransactionContext';


function App() {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (meal) => {
    setBasketItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === meal.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...meal, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (id, delta) => {
    setBasketItems(prevItems => {
      return prevItems
        .map(item => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter(item => item.quantity > 0);
    });
  };

  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="categories/:id/meals" element={<Menu addToBasket={addToBasket} />} />
          <Route path="meals/:id" element={<MealPage addToBasket={addToBasket} />} />
          <Route path="/basket" element={<BasketPage basketItems={basketItems} handleQuantityChange={handleQuantityChange} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/offers" element={<DailyOffer addToBasket={addToBasket} />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
}

export default App;