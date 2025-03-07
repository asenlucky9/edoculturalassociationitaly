import React from 'react';
import './News.css';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: 'Cultural Association Launches New Initiative',
      content: 'We are excited to announce our new cultural exchange program that aims to strengthen ties between Edo and Italian communities...',
      date: '2024-03-15',
      author: 'Admin'
    }
  ];

  return (
    <div className="news-page">
      <div className="hero-section">
        <h1>News & Updates</h1>
        <p>Stay informed about our latest activities and announcements</p>
      </div>

      <div className="content-section">
        <div className="news-grid">
          {newsArticles.map(article => (
            <div key={article.id} className="news-item">
              <h2>{article.title}</h2>
              <div className="news-meta">
                <span className="author">By {article.author}</span>
                <span className="date">{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <p className="news-content">{article.content}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News; 