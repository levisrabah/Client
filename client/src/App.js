import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './components /welcomePage';
import './App.css';
import MealPage from './components /Mealpage';
import Menu from './components /Menu';
import RegisterPage from './components /authenticaton/registerPage';
import LoginPage from './components /authenticaton/loginpage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="categories/:id/meals" element={<Menu />} />
        <Route path="meals/:id" element={<MealPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;
