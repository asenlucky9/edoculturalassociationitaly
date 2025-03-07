import React, { useState } from 'react';
import './AdminPanel.css';

const GalleryManagement = () => {
  const [images] = useState([
    {
      id: 1,
      title: 'Cultural Dance Performance',
      category: 'Events',
      uploadDate: '2024-03-15',
      description: 'Traditional Edo dance performance at the annual festival'
    },
    {
      id: 2,
      title: 'Art Exhibition',
      category: 'Culture',
      uploadDate: '2024-03-10',
      description: 'Exhibition of traditional Edo artifacts and artwork'
    }
  ]);

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gallery Management</h2>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search gallery..." 
            className="search-input"
          />
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add Image
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Upload Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td>
                  <div className="image-thumbnail">
                    <img src={`/images/gallery/${image.id}.jpg`} alt={image.title} />
                  </div>
                </td>
                <td>{image.title}</td>
                <td>{image.category}</td>
                <td>{image.uploadDate}</td>
                <td>{image.description}</td>
                <td className="actions">
                  <button className="view-btn">View</button>
                  <button className="edit-btn">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleryManagement; 