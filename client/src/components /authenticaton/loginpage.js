import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Navbar from '../navbar';
import imagesG from './pics/berry.jpeg';
import imagesU from './pics/chick.jpeg';
import imagesA from './pics/picture.jpeg';
import { Carousel } from 'react-responsive-carousel';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blaze-server-1xqz.onrender.com/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);

      setIsLoggedIn(true);

      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <Navbar />
      {!isLoggedIn ? (
        <div className="container login-container">
          <div className="login-carousel">
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
          <div className="form-card login-form">
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
              <button type="submit" className="button">Login</button>
              <button className="button register-button" onClick={() => navigate('/register')}>
                Register here
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
