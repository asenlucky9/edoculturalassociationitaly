import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Edo Cultural Association Italy</h1>
          <p className="hero-subtitle">Preserving and promoting Edo culture in Italy</p>
          <Link to="/about" className="cta-button">Learn More</Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="card-grid">
          {/* Event cards will be dynamically added here */}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Latest News</h2>
        <div className="card-grid">
          {/* News cards will be dynamically added here */}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Photo Gallery</h2>
        <div className="card-grid">
          {/* Gallery items will be dynamically added here */}
        </div>
      </section>

      <section className="features">
        <div className="grid">
          <div className="feature-card">
            <h3>Our Mission</h3>
            <p>To promote and preserve Edo cultural heritage in Italy while fostering unity and support among members.</p>
          </div>
          <div className="feature-card">
            <h3>Cultural Events</h3>
            <p>Join us in celebrating traditional festivals, cultural exhibitions, and community gatherings.</p>
          </div>
          <div className="feature-card">
            <h3>Community Support</h3>
            <p>Building a strong network of support for Edo people living in Italy.</p>
          </div>
        </div>
      </section>

      <section className="president-section">
        <div className="president-content">
          <img 
            src="/president-image.jpg" 
            alt="Association President"
            className="president-image"
          />
          <div className="president-info">
            <h2>Message from the President</h2>
            <p>Welcome to our cultural family. Together, we strive to maintain our rich heritage while embracing our new home in Italy.</p>
            <span className="president-name">- King Luca</span>
          </div>
        </div>
      </section>

      <section className="join-us">
        <div className="join-content">
          <h2>Become a Member</h2>
          <p>Join our growing community and be part of something special.</p>
          <button className="btn">Register Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home; 