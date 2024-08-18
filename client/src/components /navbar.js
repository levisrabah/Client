import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by verifying if a token exists
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role'); // Get the user's role from localStorage
        if (token) {
            setIsLoggedIn(true);
            setUserRole(role);
        } else {
            setIsLoggedIn(false);
            setUserRole(null);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Remove the token and role from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false); // Update the logged-in state
        setUserRole(null); // Reset the user role
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="blaze-navbar">
            <div className="blaze-navbar-container">
                <Link to="/" className="blaze-navbar-logo">Blaze</Link>
                <div className={`blaze-navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {!isLoggedIn && (
                        <Link to="/login">Login</Link>
                    )}
                    <Link to="/categories">Categories</Link>
                    <Link to="/basket">Basket</Link>
                    <Link to="/offers">Offers</Link>
                    {/* Conditionally render the Transactions link based on the user's role */}
                    {userRole === 'admin' && (
                        <Link to="/transactions">Transactions</Link>
                    )}
                    {isLoggedIn && (
                        <button className="blaze-logout-button" onClick={handleLogout}>
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
