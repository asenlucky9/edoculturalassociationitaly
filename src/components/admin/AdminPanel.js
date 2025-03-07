import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MemberManagement from './MemberManagement';
import EventManagement from './EventManagement';
import GalleryManagement from './GalleryManagement';
import NewsManagement from './NewsManagement';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading, error, login, logout } = useAuth();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Welcome to Admin Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Members</h3>
                <p className="stat-number">25</p>
                <span className="stat-change positive">+3 this month</span>
              </div>
              <div className="stat-card">
                <h3>Active Events</h3>
                <p className="stat-number">4</p>
                <span className="stat-change">Upcoming</span>
              </div>
              <div className="stat-card">
                <h3>Gallery Items</h3>
                <p className="stat-number">48</p>
                <span className="stat-change">Last updated today</span>
              </div>
              <div className="stat-card">
                <h3>News Articles</h3>
                <p className="stat-number">12</p>
                <span className="stat-change">This month</span>
              </div>
            </div>
          </div>
        );
      case 'members':
        return <MemberManagement />;
      case 'events':
        return <EventManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'news':
        return <NewsManagement />;
      default:
        return <div>Select a section</div>;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginData.username, loginData.password);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!user) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <img src="/images/admin/admin-avatar.jpg" alt="Admin" className="admin-avatar" />
          <h3>{user.name || 'Admin User'}</h3>
          <p>{user.role || 'Administrator'}</p>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <i className="fas fa-users"></i> Manage Members
          </button>
          <button
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <i className="fas fa-calendar-alt"></i> Manage Events
          </button>
          <button
            className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <i className="fas fa-images"></i> Manage Gallery
          </button>
          <button
            className={`nav-item ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <i className="fas fa-newspaper"></i> Manage News
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        <div className="admin-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 