import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import './Logo.css';

const Logo = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error('Error loading logo image');
  };

  return (
    <div className="logo-wrapper">
      <div className="logo-container">
        <div className="logo-3d-container">
          <Image
            src="/images/logos.png"
            alt="EDO Cultural Association Udine Italy"
            className="logo-image main-logo"
            fluid
            onError={handleImageError}
            style={{ display: imageError ? 'none' : 'block' }}
          />
          <div className="logo-overlay"></div>
        </div>
        <div className="logo-text-container">
          <div className="logo-title">EDO Cultural</div>
          <div className="logo-subtitle">Association</div>
          <div className="logo-location">Udine • Italy</div>
        </div>
        <div className="logo-effects">
          <div className="logo-shine"></div>
          <div className="logo-glow"></div>
          <div className="logo-reflection"></div>
          <div className="logo-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo; 