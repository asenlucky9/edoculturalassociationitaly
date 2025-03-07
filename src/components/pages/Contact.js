import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-page">
      <h1 className="section-title">Contact Us</h1>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>Via Roma 123</p>
            <p>33100 Udine (UD)</p>
            <p>Italy</p>
          </div>

          <div className="info-card">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+39 123 456 7890</p>
          </div>

          <div className="info-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>info@edoculturalitaly.org</p>
          </div>

          <div className="info-card">
            <i className="fas fa-clock"></i>
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 - 17:00</p>
            <p>Saturday: 10:00 - 14:00</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.882367493019!2d13.233890776191744!3d46.06274997911239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477a4aa0961ea37d%3A0x8a6a5e5a6c2c5e0a!2sUdine%2C%20Province%20of%20Udine%2C%20Italy!5e0!3m2!1sen!2sus!4v1709828006044!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact; 