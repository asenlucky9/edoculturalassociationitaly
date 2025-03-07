import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
  const isAdminPage = location.pathname.startsWith('/admin');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Edo Cultural Association Italy
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/membership" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Membership
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </li>
          )}
          {!isAdmin && !isAdminPage && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link login-btn" onClick={() => setIsMenuOpen(false)}>
                Admin Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;