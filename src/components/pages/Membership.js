import React, { useState } from 'react';
import './Membership.css';

const Membership = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'individual',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="membership-page">
      <section className="section">
        <h2 className="section-title">Membership Registration</h2>
        <div className="membership-content">
          <div className="membership-info">
            <h3>Why Become a Member?</h3>
            <ul className="benefits-list">
              <li>Access to exclusive cultural events</li>
              <li>Regular newsletters and updates</li>
              <li>Networking opportunities</li>
              <li>Participation in cultural activities</li>
              <li>Support in preserving Edo culture</li>
            </ul>
          </div>

          <form className="membership-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="membershipType">Membership Type</label>
              <select
                id="membershipType"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                required
              >
                <option value="individual">Individual</option>
                <option value="family">Family</option>
                <option value="student">Student</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Registration
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Membership; 