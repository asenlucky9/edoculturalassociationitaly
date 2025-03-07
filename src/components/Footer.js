import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Via Roma 123</p>
          <p>33100 Udine (UD)</p>
          <p>Italy</p>
          <p>Email: info@edoculturalitaly.org</p>
          <p>Phone: +39 123 456 7890</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/membership">Become a Member</Link>
          <Link to="/events">Events</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/donations">Support Us</Link>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Edo Cultural Association Italy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 