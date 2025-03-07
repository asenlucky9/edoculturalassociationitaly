import React, { useState } from 'react';
import './AdminPanel.css';

const EventManagement = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Cultural Festival 2024',
      date: '2024-06-15',
      time: '14:00',
      location: 'City Center Plaza',
      status: 'upcoming',
      description: 'Annual cultural festival celebrating Edo heritage'
    },
    {
      id: 2,
      title: 'Community Meeting',
      date: '2024-04-20',
      time: '18:00',
      location: 'Community Hall',
      status: 'upcoming',
      description: 'Monthly community gathering and discussion'
    }
  ]);

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Event Management</h2>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search events..." 
            className="search-input"
          />
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add Event
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.location}</td>
                <td>
                  <span className={`status-badge ${event.status}`}>
                    {event.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="view-btn">View Details</button>
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

export default EventManagement; 