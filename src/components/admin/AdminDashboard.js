import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [membershipApplications, setMembershipApplications] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    date: '',
    time: '',
    attendees: []
  });
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
    // Load data
    loadData();
  }, [navigate]);

  const loadData = () => {
    // Load membership applications
    const applications = JSON.parse(localStorage.getItem('membershipApplications') || '[]');
    setMembershipApplications(applications);
    
    // Load approved members
    const approved = applications.filter(app => app.status === 'approved');
    setApprovedMembers(approved);
    
    // Load events
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    console.log('Loading events from localStorage:', storedEvents);
    setEvents(storedEvents);
    
    // Load other data
    setGallery(JSON.parse(localStorage.getItem('gallery') || '[]'));
    setNews(JSON.parse(localStorage.getItem('news') || '[]'));
    
    // Load meetings data
    setMeetings(JSON.parse(localStorage.getItem('meetings') || '[]'));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleUpdateStatus = (applicationId, newStatus) => {
    const updatedApplications = membershipApplications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
    localStorage.setItem('membershipApplications', JSON.stringify(updatedApplications));
    setMembershipApplications(updatedApplications);
    
    // Update approved members list
    if (newStatus === 'approved') {
      const newMember = updatedApplications.find(app => app.id === applicationId);
      setApprovedMembers(prev => [...prev, newMember]);
    } else if (newStatus === 'rejected') {
      setApprovedMembers(prev => prev.filter(member => member.id !== applicationId));
    }
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    meetings.push({ ...newMeeting, id: Date.now() });
    localStorage.setItem('meetings', JSON.stringify(meetings));
    setMeetings(meetings);
    setNewMeeting({ date: '', time: '', attendees: [] });
  };

  const handleUpdateAttendance = (meetingId, memberId, attended) => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        const attendees = attended
          ? [...meeting.attendees, memberId]
          : meeting.attendees.filter(id => id !== memberId);
        return { ...meeting, attendees };
      }
      return meeting;
    });
    
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
  };

  const handleViewMeeting = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseAttendanceModal = () => {
    setSelectedMeeting(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        gallery.push({
          id: Date.now(),
          url: reader.result,
          caption: file.name
        });
        localStorage.setItem('gallery', JSON.stringify(gallery));
        setGallery(gallery);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      // Update membership applications
      const updatedApplications = membershipApplications.map(app => {
        if (app.id === memberId) {
          return { ...app, status: 'rejected' };
        }
        return app;
      });
      localStorage.setItem('membershipApplications', JSON.stringify(updatedApplications));
      setMembershipApplications(updatedApplications);
      
      // Update approved members list
      setApprovedMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const handleViewMemberAttendance = (member) => {
    setSelectedMember(member);
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleSelectAllPresent = () => {
    setSelectedMembers(approvedMembers.map(member => member.id));
  };

  const handleDeselectAll = () => {
    setSelectedMembers([]);
  };

  const handleMarkAttendance = () => {
    if (!attendanceDate || !attendanceTime || !meetingTitle) {
      alert('Please fill in all fields (Title, Date, and Time)');
      return;
    }

    const presentMembers = selectedMembers;
    const absentMembers = approvedMembers
      .filter(member => !selectedMembers.includes(member.id))
      .map(member => member.id);

    const newAttendance = {
      id: Date.now(),
      title: meetingTitle,
      date: `${attendanceDate}T${attendanceTime}`,
      attendees: presentMembers,
      absentees: absentMembers
    };
    
    const updatedMeetings = [...meetings, newAttendance];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    
    // Clear selections
    setSelectedMembers([]);
    setAttendanceDate('');
    setAttendanceTime('');
    setMeetingTitle('');
    
    // Show success message with present and absent counts
    alert(`Attendance marked successfully!\nPresent: ${presentMembers.length} members\nAbsent: ${absentMembers.length} members`);
  };

  const filteredMembers = approvedMembers.filter(member => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.surname.toLowerCase().includes(searchLower) ||
      member.phone.includes(searchQuery)
    );
  });

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
  };

  // Add useEffect to load events when component mounts
  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
    // Load data
    loadData();
  }, [navigate]);

  // Add useEffect to load events when events tab is selected
  useEffect(() => {
    if (activeTab === 'events') {
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      console.log('Loading events for events tab:', storedEvents);
      setEvents(storedEvents);
    }
  }, [activeTab]);

  // Add console log to check events state when rendering
  console.log('Current events state:', events);

  const handleAddEvent = (e) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new event with all required fields
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      description: newEvent.description,
      image: newEvent.image || null,
      createdAt: new Date().toISOString()
    };

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Add new event to the array
    const updatedEvents = [...existingEvents, event];
    
    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    
    // Update state
    setEvents(updatedEvents);
    
    // Clear form
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: null
    });

    alert('Event created successfully!');
  };

  const handleEventImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Membership Applications
        </button>
        <button
          className={`nav-btn ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved Members
        </button>
        <button
          className={`nav-btn ${activeTab === 'meetings' ? 'active' : ''}`}
          onClick={() => setActiveTab('meetings')}
        >
          Meetings
        </button>
        <button
          className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button
          className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
        <button
          className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'approved' && (
          <div className="approved-members-section">
            <h2>Approved Members</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="members-list">
              {filteredMembers.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-header">
                    <h3>{member.surname}, {member.name}</h3>
                    <span className="member-status">Active Member</span>
                  </div>
                  <div className="member-details">
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                    <p><strong>Joined:</strong> {new Date(member.submissionDate).toLocaleDateString()}</p>
                    <p><strong>Occupation:</strong> {member.occupation}</p>
                  </div>
                  <div className="member-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewApplication(member)}
                    >
                      View Details
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Delete Member
                    </button>
                  </div>
                </div>
              ))}
              {filteredMembers.length === 0 && (
                <p className="no-data">
                  {searchQuery ? 'No members found matching your search.' : 'No approved members yet.'}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="members-section">
            <h2>Membership Applications</h2>
            <div className="applications-list">
              {membershipApplications.map(application => (
                <div key={application.id} className="application-card">
                  <div className="application-header">
                    <h3>{application.surname}, {application.name}</h3>
                    <span className={`status-badge ${application.status}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="application-details">
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone}</p>
                    <p><strong>Submitted:</strong> {new Date(application.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div className="application-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewApplication(application)}
                    >
                      View Details
                    </button>
                    {application.status === 'pending' && (
                      <div className="status-actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleUpdateStatus(application.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleUpdateStatus(application.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {membershipApplications.length === 0 && (
                <p className="no-data">No membership applications received yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="meetings-section">
            <h2>Member Attendance List</h2>
            
            {/* Add Attendance Form */}
            <div className="add-attendance-form">
              <h3>Mark Attendance</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleMarkAttendance();
              }}>
                <div className="form-group">
                  <label htmlFor="meetingTitle">Meeting Title</label>
                  <input
                    type="text"
                    id="meetingTitle"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Enter meeting title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attendanceDate">Date</label>
                  <input
                    type="date"
                    id="attendanceDate"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attendanceTime">Time</label>
                  <input
                    type="time"
                    id="attendanceTime"
                    value={attendanceTime}
                    onChange={(e) => setAttendanceTime(e.target.value)}
                    required
                  />
                </div>
                <div className="attendance-actions">
                  <button type="button" className="select-all-btn" onClick={handleSelectAllPresent}>
                    Select All Present
                  </button>
                  <button type="button" className="deselect-all-btn" onClick={handleDeselectAll}>
                    Deselect All
                  </button>
                </div>
                <div className="attendance-summary">
                  <div className="summary-item present">
                    <span className="summary-label">Present Members:</span>
                    <span className="summary-value">{selectedMembers.length}</span>
                  </div>
                  <div className="summary-item absent">
                    <span className="summary-label">Absent Members:</span>
                    <span className="summary-value">{approvedMembers.length - selectedMembers.length}</span>
                  </div>
                </div>
                <button type="submit" className="add-btn">Mark Attendance</button>
              </form>
            </div>

            <div className="member-attendance-list">
              {approvedMembers.map(member => (
                <div 
                  key={member.id} 
                  className={`member-attendance-card ${selectedMembers.includes(member.id) ? 'present' : 'absent'}`}
                  onClick={() => handleMemberSelection(member.id)}
                >
                  <div className="member-attendance-header">
                    <h3>{member.surname}, {member.name}</h3>
                    <span className={`member-status ${selectedMembers.includes(member.id) ? 'present' : 'absent'}`}>
                      {selectedMembers.includes(member.id) ? 'Present' : 'Absent'}
                    </span>
                  </div>
                  <div className="member-attendance-details">
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                    <p><strong>Joined:</strong> {new Date(member.submissionDate).toLocaleDateString()}</p>
                    <p><strong>Occupation:</strong> {member.occupation}</p>
                  </div>
                  <div className="attendance-stats">
                    <div className="attendance-stat-item">
                      <span className="stat-label">Total Meetings</span>
                      <span className="stat-value">{meetings.length}</span>
                    </div>
                    <div className="attendance-stat-item">
                      <span className="stat-label">Present</span>
                      <span className="stat-value present">
                        {meetings.filter(meeting => meeting.attendees.includes(member.id)).length}
                      </span>
                    </div>
                    <div className="attendance-stat-item">
                      <span className="stat-label">Absent</span>
                      <span className="stat-value absent">
                        {meetings.filter(meeting => meeting.absentees?.includes(member.id)).length}
                      </span>
                    </div>
                  </div>
                  <div className="member-actions">
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewApplication(member);
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="attendance-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMemberAttendance(member);
                      }}
                    >
                      View Attendance
                    </button>
                  </div>
                </div>
              ))}
              {approvedMembers.length === 0 && (
                <p className="no-data">No approved members yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <h2>Events Management</h2>
            <form onSubmit={handleAddEvent} className="add-form">
              <div className="form-group">
                <label htmlFor="eventTitle">Event Title</label>
                <input
                  type="text"
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Date</label>
                <input
                  type="date"
                  id="eventDate"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventTime">Time</label>
                <input
                  type="time"
                  id="eventTime"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Location</label>
                <input
                  type="text"
                  id="eventLocation"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Description</label>
                <textarea
                  id="eventDescription"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventImage">Event Image</label>
                <input
                  type="file"
                  id="eventImage"
                  accept="image/*"
                  onChange={handleEventImageUpload}
                />
              </div>
              <button type="submit" className="add-btn">Create Event</button>
            </form>

            <div className="events-list">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <span className="event-date">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="event-details">
                      <p><strong>Location:</strong> {event.location}</p>
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Description:</strong> {event.description}</p>
                      {event.image && (
                        <div className="event-image">
                          <img src={event.image} alt={event.title} />
                        </div>
                      )}
                    </div>
                    <div className="event-actions">
                      <button 
                        className="view-btn"
                        onClick={() => handleViewEvent(event)}
                      >
                        View Details
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete Event
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <p>No events found. Create a new event to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <h2>Gallery Management</h2>
            <div className="upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            </div>
            <div className="gallery-grid">
              {gallery.map(image => (
                <div key={image.id} className="gallery-item">
                  <img src={image.url} alt={image.caption} />
                  <button className="delete-btn">Delete</button>
                </div>
              ))}
              {gallery.length === 0 && (
                <p className="no-data">No images in gallery.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="news-section">
            <h2>News Management</h2>
            <form onSubmit={handleAddMeeting} className="add-form">
              <div className="form-group">
                <label htmlFor="newsTitle">Title</label>
                <input
                  type="text"
                  id="newsTitle"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newsContent">Content</label>
                <textarea
                  id="newsContent"
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="add-btn">Add News</button>
            </form>

            <div className="news-list">
              {news.map(item => (
                <div key={item.id} className="news-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="date">{new Date(item.date).toLocaleDateString()}</p>
                  <button className="delete-btn">Delete</button>
                </div>
              ))}
              {news.length === 0 && (
                <p className="no-data">No news articles added yet.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <h2>Application Details</h2>
            <div className="application-details-modal">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {selectedApplication.name} {selectedApplication.surname}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                <p><strong>Date of Birth:</strong> {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Nationality:</strong> {selectedApplication.nationality}</p>
                <p><strong>State of Origin:</strong> {selectedApplication.stateOfOrigin}</p>
              </div>

              <div className="detail-section">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> {selectedApplication.address}</p>
                <p><strong>Occupation:</strong> {selectedApplication.occupation}</p>
                <p><strong>ID Number/Passport:</strong> {selectedApplication.identification}</p>
              </div>

              <div className="detail-section">
                <h3>Next of Kin</h3>
                <p><strong>Name:</strong> {selectedApplication.nextOfKin.name}</p>
                <p><strong>Relationship:</strong> {selectedApplication.nextOfKin.relationship}</p>
                <p><strong>Phone:</strong> {selectedApplication.nextOfKin.phone}</p>
                <p><strong>Address:</strong> {selectedApplication.nextOfKin.address}</p>
              </div>

              {selectedApplication.documents && selectedApplication.documents.length > 0 && (
                <div className="detail-section">
                  <h3>Documents</h3>
                  <div className="documents-grid">
                    {selectedApplication.documents.map((doc, index) => (
                      <div key={index} className="document-item">
                        {doc.startsWith('data:image') ? (
                          <div className="image-preview">
                            <img 
                              src={doc} 
                              alt={`Document ${index + 1}`} 
                              onClick={() => window.open(doc, '_blank')}
                            />
                            <span>Document {index + 1}</span>
                          </div>
                        ) : (
                          <div className="pdf-preview">
                            <div className="pdf-icon">📄</div>
                            <span>PDF Document {index + 1}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {selectedMeeting && (
        <div className="attendance-modal">
          <div className="attendance-content">
            <button className="close-modal" onClick={handleCloseAttendanceModal}>×</button>
            <h2>Attendance for {selectedMeeting.title}</h2>
            <p className="meeting-info">
              <strong>Date:</strong> {new Date(selectedMeeting.date).toLocaleString()}<br />
              <strong>Location:</strong> {selectedMeeting.location}
            </p>
            <div className="attendance-list">
              {approvedMembers.map(member => (
                <div key={member.id} className="attendance-item">
                  <span>{member.name} {member.surname}</span>
                  <div className="attendance-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedMeeting.attendees.includes(member.id)}
                      onChange={(e) => handleUpdateAttendance(
                        selectedMeeting.id,
                        member.id,
                        e.target.checked
                      )}
                    />
                    <span>{selectedMeeting.attendees.includes(member.id) ? 'Present' : 'Absent'}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="attendance-summary">
              <p>
                <strong>Total Members:</strong> {approvedMembers.length}<br />
                <strong>Present:</strong> {selectedMeeting.attendees.length}<br />
                <strong>Absent:</strong> {approvedMembers.length - selectedMeeting.attendees.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedMember && (
        <div className="attendance-modal">
          <div className="attendance-content">
            <button className="close-modal" onClick={() => setSelectedMember(null)}>×</button>
            <h2>Attendance History for {selectedMember.name} {selectedMember.surname}</h2>
            <div className="member-info">
              <p><strong>Email:</strong> {selectedMember.email}</p>
              <p><strong>Phone:</strong> {selectedMember.phone}</p>
              <p><strong>Joined:</strong> {new Date(selectedMember.submissionDate).toLocaleDateString()}</p>
            </div>
            <div className="attendance-list">
              {meetings.map(meeting => (
                <div key={meeting.id} className="attendance-item">
                  <div className="meeting-info">
                    <h4>{meeting.title}</h4>
                    <p>{new Date(meeting.date).toLocaleString()}</p>
                  </div>
                  <div className="attendance-status">
                    {meeting.attendees.includes(selectedMember.id) ? (
                      <span className="status-present">Present</span>
                    ) : (
                      <span className="status-absent">Absent</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="attendance-summary">
              <p>
                <strong>Total Meetings:</strong> {meetings.length}<br />
                <strong>Meetings Attended:</strong> {meetings.filter(meeting => meeting.attendees.includes(selectedMember.id)).length}<br />
                <strong>Attendance Rate:</strong> {meetings.length > 0
                  ? `${Math.round((meetings.filter(meeting => meeting.attendees.includes(selectedMember.id)).length / meetings.length) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseEventModal}>×</button>
            <h2>{selectedEvent.title}</h2>
            <div className="detail-section">
              <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Time:</strong> {selectedEvent.time}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              {selectedEvent.image && (
                <div className="event-image">
                  <img src={selectedEvent.image} alt={selectedEvent.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 