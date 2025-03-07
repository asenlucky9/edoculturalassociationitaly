import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// TODO: SECURITY WARNING - DO NOT USE IN PRODUCTION
// These credentials should be moved to a secure backend authentication system
// This is only for development/demo purposes
const ADMIN_CREDENTIALS = {
  username: process.env.REACT_APP_ADMIN_USERNAME || 'admin',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'EdoCultural2024!'
};

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with actual backend authentication
      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        // TODO: Replace with proper JWT/session management
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Admin Login</h1>
        {process.env.NODE_ENV === 'development' && (
          <div className="development-warning">
            ⚠️ Development Mode: Secure authentication not implemented
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 