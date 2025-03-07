import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Events from './components/pages/Events';
import Gallery from './components/pages/Gallery';
import News from './components/pages/News';
import Membership from './components/pages/Membership';
import Contact from './components/pages/Contact';
import Donations from './components/pages/Donations';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="app">
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            <Link to="/" className="logo-link">
              <Logo />
            </Link>
            <nav className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/events" className="nav-link">Events</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
              <Link to="/membership" className="nav-link">Membership</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/admin" className="nav-link admin-link">Admin</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donations" element={<Donations />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: info@edocultural.it</p>
              <p>Phone: +39 XXX XXX XXXX</p>
              <p>Address: Via Example, 123, City, Italy</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <p>About Us</p>
              <p>Events</p>
              <p>Gallery</p>
              <p>Contact</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>

        <button 
          className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
        >
          ↑
        </button>
      </div>
    </Router>
  );
};

export default App;
