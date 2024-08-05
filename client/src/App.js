import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components /welcomePage';
import './App.css';
import MealPage from './components /Mealpage';
import Menu from './components /menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Add a redirect if needed */}
        <Route path="meals/:id" element={<MealPage />} />
        <Route path='categories/:id/meals' element={<Menu />} />
        {/* /Route path="*" element={<Navigate to="/welcome" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
