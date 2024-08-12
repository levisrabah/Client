import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Optionally, remove the role
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="blaze-navbar">
            <div className="blaze-navbar-container">
                <Link to="/" className="blaze-navbar-logo">Blaze</Link>
                <div className={`blaze-navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/login">Login</Link>
                    <Link to="/categories">Order</Link>
                    <Link to="/basket">Basket</Link>
                    <Link to="/offers">Offers</Link>
                    <Link to="/transactions">Transactions</Link>
                    {/* Logout button */}
                    <button className="blaze-logout-button" onClick={handleLogout}>
                        Logout
                    </button>
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
