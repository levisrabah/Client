import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registerPage.css';
import Navbar from '../navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagesG from './pics/berry.jpeg';
import imagesU from './pics/chick.jpeg';
import imagesA from './pics/picture.jpeg';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = role === 'admin' ? 'https://blaze-server-1xqz.onrender.com/admins' : 'http://127.0.0.1:5555/register';
      await axios.post(url, {
        username,
        email,
        password,
        role,
      });
      navigate('/login'); // Navigate to login page after successful registration
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Registration failed');
    }
  };
  

  return (
   <>
   <Navbar />
    <div className="register-container">
      <div className="register-carousel">
        <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
        transitionTime={600}
      >
        <img src={imagesG} alt="image1" />
        <img src={imagesA} alt="image2" />
        <img src={imagesU} alt="image3" />
        </Carousel>
      </div>
      <div className="register-form-card">
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
    </> 
  );
};

export default RegisterPage;
