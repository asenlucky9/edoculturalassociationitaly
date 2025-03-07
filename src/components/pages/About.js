import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Preserving and Promoting Edo Culture in Italy</p>
      </div>

      <div className="content-section">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            The Edo Cultural Association Italy is dedicated to preserving, promoting, and celebrating
            the rich cultural heritage of the Edo people while fostering unity and cultural exchange
            within the Italian community.
          </p>
        </div>

        <div className="vision-section">
          <h2>Our Vision</h2>
          <p>
            To create a vibrant community that serves as a bridge between Edo culture and Italian
            society, promoting understanding, respect, and appreciation for our cultural heritage.
          </p>
        </div>

        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Cultural Preservation</h3>
              <p>Maintaining and protecting our rich Edo heritage for future generations.</p>
            </div>
            <div className="value-card">
              <h3>Community Unity</h3>
              <p>Fostering strong bonds among members and the wider Italian community.</p>
            </div>
            <div className="value-card">
              <h3>Cultural Exchange</h3>
              <p>Promoting dialogue and understanding between Edo and Italian cultures.</p>
            </div>
            <div className="value-card">
              <h3>Education</h3>
              <p>Sharing knowledge of Edo traditions, language, and customs.</p>
            </div>
          </div>
        </div>

        <div className="history-section">
          <h2>Our History</h2>
          <p>
            Founded in 2024, the Edo Cultural Association Italy emerged from the vision of
            bringing together Edo people living in Italy. What started as informal gatherings
            has grown into a vibrant community organization dedicated to cultural preservation
            and promotion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 