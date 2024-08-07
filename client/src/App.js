import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components /WelcomePage';
import './App.css';
import MealPage from './components /Mealpage';
import LoginPage from './components /authenticaton/loginpage';
import RegisterPage from './components /authenticaton/registerPage';
import Menu from './components /Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="categories/:id/meals" element={<Menu />} />
        <Route path="meals/:id" element={<MealPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;
