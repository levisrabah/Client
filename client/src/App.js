import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components /WelcomePage';
import './App.css';
import MealPage from './components /Mealpage';
import Menu from './components /Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="categories/:id/meals" element={<Menu />} />
        <Route path="meals/:id" element={<MealPage />} />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;
