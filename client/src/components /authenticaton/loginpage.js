import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Navbar from '../navbar'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5555/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role); // Store the role in local storage

      setIsLoggedIn(true); // Set logged in state to true

      if (response.data.role === 'admin') {
        navigate('/admin-dashboard'); // Navigate to admin dashboard
      } else {
        navigate('/user-dashboard'); // Navigate to user dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Conditionally render the login form if the user is not logged in
  return (
    <>
      <Navbar /> {/* Add Navbar component here */}
      {!isLoggedIn ? (
        <div className="login-container">
          <div className="login-image">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="Pizza" />
            <div className="image-text">Best Blaze meal Try IT</div>
          </div>
          <div className="login-form">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
            <button className="register-button" onClick={() => navigate('/register')}>
              Register here
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
