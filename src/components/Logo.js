import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img 
        src="/images/logo.png" 
        alt="Edo Cultural Association Logo" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo; 