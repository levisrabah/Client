import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <p>Blaze</p>
            <div className="navbar-links">
                <Link to="/Home">Home</Link>
                <Link to="/categories">Order</Link>
                <Link to="/basket">Basket</Link>
                <Link to="/offers">Offers</Link>
            </div>
        </div>
    );
}

export default Navbar;