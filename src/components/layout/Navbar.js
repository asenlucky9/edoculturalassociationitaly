import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Edo Cultural Association Italy
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/events" className="nav-item">Events</Link>
        <Link to="/membership" className="nav-item">Membership</Link>
        <Link to="/contact" className="nav-item">Contact Us</Link>
        <Link to="/donations" className="nav-item">Donations</Link>
        <Link to="/gallery" className="nav-item">Foto Galaxy</Link>
        <Link to="/news" className="nav-item">Blog/News</Link>
        <Link to="/admin" className="nav-item admin-link">Admin Panel</Link>
      </div>
    </nav>
  );
};

export default Navbar; 