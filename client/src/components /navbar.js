import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="blaze-navbar">
            <div className="blaze-navbar-container">
                <Link to="/" className="blaze-navbar-logo">Blaze</Link>
                <div className={`blaze-navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {!isLoggedIn && (
                        <Link to="/login" onClick={toggleMenu}>Login</Link>
                    )}
                    <Link to="/categories" onClick={toggleMenu}>Order</Link>
                    <Link to="/basket" onClick={toggleMenu}>Basket</Link>
                    <Link to="/offers" onClick={toggleMenu}>Offers</Link>
                    <Link to="/transactions" onClick={toggleMenu}>Transactions</Link>
                    {isLoggedIn && (
                        <button className="blaze-logout-button" onClick={() => { handleLogout(); toggleMenu(); }}>
                            Logout
                        </button>
                    )}
                </div>
                <div className="blaze-navbar-hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;