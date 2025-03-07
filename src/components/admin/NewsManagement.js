import React, { useState } from 'react';
import './AdminPanel.css';

const NewsManagement = () => {
  const [news] = useState([
    {
      id: 1,
      title: 'Annual Cultural Festival Announced',
      category: 'Events',
      publishDate: '2024-03-15',
      status: 'published',
      author: 'Admin',
      summary: 'Details of the upcoming annual cultural festival have been announced'
    },
    {
      id: 2,
      title: 'New Community Initiative',
      category: 'Community',
      publishDate: '2024-03-10',
      status: 'draft',
      author: 'Editor',
      summary: 'New initiative to promote Edo culture among youth'
    }
  ]);

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>News Management</h2>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search news..." 
            className="search-input"
          />
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add Article
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.publishDate}</td>
                <td>
                  <span className={`status-badge ${article.status}`}>
                    {article.status}
                  </span>
                </td>
                <td>{article.author}</td>
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

export default NewsManagement; 