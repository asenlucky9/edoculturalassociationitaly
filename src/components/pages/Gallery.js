import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    {
      id: 1,
      title: 'Cultural Festival 2024',
      description: 'Highlights from our annual festival',
      url: '/images/festival.jpg',
      date: '2024-03-15'
    }
  ];

  return (
    <div className="gallery-page">
      <div className="hero-section">
        <h1>Gallery</h1>
        <p>Capturing moments from our cultural events and activities</p>
      </div>

      <div className="content-section">
        <div className="gallery-grid">
          {images.map(image => (
            <div key={image.id} className="gallery-item">
              <img src={image.url} alt={image.title} />
              <div className="gallery-item-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <span className="date">{new Date(image.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 