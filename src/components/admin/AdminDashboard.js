import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';
import { Container, Row, Col, Table, Button, Badge, Tabs, Tab, Card, Form, Modal, Image, Nav } from 'react-bootstrap';
import { useMemberContext } from '../../context/MemberContext';
import ManagePresident from './ManagePresident';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { applications, approveApplication, rejectApplication, getApplicationsByStatus } = useMemberContext();
  const [activeMainTab, setActiveMainTab] = useState('membership');
  const [activeMembershipTab, setActiveMembershipTab] = useState('pending');
  const [membershipApplications, setMembershipApplications] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
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
  }, [navigate, applications]);

  const loadData = () => {
    // Load membership applications
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
    if (newStatus === 'approved') {
      approveApplication(applicationId);
    } else if (newStatus === 'rejected') {
      rejectApplication(applicationId);
    }
    
    // Update local state
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
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
    const meeting = {
      id: Date.now(),
      ...newMeeting,
      createdAt: new Date().toISOString()
    };
    const updatedMeetings = [...meetings, meeting];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      attendees: []
    });
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
        const newImage = {
          id: Date.now(),
          url: reader.result,
          caption: file.name,
          uploadDate: new Date().toISOString()
        };
        const updatedGallery = [...gallery, newImage];
        setGallery(updatedGallery);
        localStorage.setItem('gallery', JSON.stringify(updatedGallery));
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

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const updatedGallery = gallery.filter(img => img.id !== imageId);
      setGallery(updatedGallery);
      localStorage.setItem('gallery', JSON.stringify(updatedGallery));
    }
  };

  const renderMembershipApplications = (status) => {
    const filteredApplications = membershipApplications.filter(app => app.status === status);
    
    return (
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.surname} {app.name}</td>
              <td>{app.email}</td>
              <td>{app.membershipType}</td>
              <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
              <td>
                <Badge bg={
                  app.status === 'approved' ? 'success' :
                  app.status === 'rejected' ? 'danger' :
                  'warning'
                }>
                  {app.status}
                </Badge>
              </td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdateStatus(app.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUpdateStatus(app.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="info"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleViewApplication(app)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
          {filteredApplications.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No {status} applications found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <Container fluid className="admin-dashboard py-4">
      {/* Header Section */}
      <div className="admin-header mb-4">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="admin-title">
              <i className="fas fa-user-shield me-2"></i>
              Admin Dashboard
            </h1>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="outline-danger" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </Button>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} lg={2} className="admin-sidebar">
          <Card className="mb-4">
            <Card.Body>
              <Nav variant="pills" className="flex-column">
                <Nav.Link 
                  eventKey="membership" 
                  active={activeMainTab === 'membership'}
                  onClick={() => setActiveMainTab('membership')}
                >
                  <i className="fas fa-users me-2"></i>
                  Membership
                </Nav.Link>
                <Nav.Link 
                  eventKey="events" 
                  active={activeMainTab === 'events'}
                  onClick={() => setActiveMainTab('events')}
                >
                  <i className="fas fa-calendar-alt me-2"></i>
                  Events
                </Nav.Link>
                <Nav.Link 
                  eventKey="gallery" 
                  active={activeMainTab === 'gallery'}
                  onClick={() => setActiveMainTab('gallery')}
                >
                  <i className="fas fa-images me-2"></i>
                  Gallery
                </Nav.Link>
                <Nav.Link 
                  eventKey="meetings" 
                  active={activeMainTab === 'meetings'}
                  onClick={() => setActiveMainTab('meetings')}
                >
                  <i className="fas fa-handshake me-2"></i>
                  Meetings
                </Nav.Link>
                <Nav.Link 
                  eventKey="president" 
                  active={activeMainTab === 'president'}
                  onClick={() => setActiveMainTab('president')}
                >
                  <i className="fas fa-user-tie me-2"></i>
                  President
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content Area */}
        <Col md={9} lg={10} className="admin-content">
          <Card>
            <Card.Body>
              <Tabs
                activeKey={activeMainTab}
                onSelect={(k) => setActiveMainTab(k)}
                className="mb-4"
              >
                {/* Membership Tab */}
                <Tab eventKey="membership" title="Membership">
      <div className="admin-section">
                    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-section-title">
                        <i className="fas fa-users"></i>
                        Membership Management
        </h2>
                      <Form.Control
                        type="search"
                        placeholder="Search members..."
                        className="w-auto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Tabs
                      activeKey={activeMembershipTab}
                      onSelect={(k) => setActiveMembershipTab(k)}
                      className="mb-4"
                    >
                      <Tab eventKey="pending" title="Pending Applications">
                        {renderMembershipApplications('pending')}
                      </Tab>
                      <Tab eventKey="approved" title="Approved Members">
                        {renderMembershipApplications('approved')}
                      </Tab>
                      <Tab eventKey="rejected" title="Rejected Applications">
                        {renderMembershipApplications('rejected')}
                      </Tab>
                    </Tabs>
                  </div>
                </Tab>

                {/* Events Tab */}
                <Tab eventKey="events" title="Events">
                  <div className="admin-section">
                    <h2 className="admin-section-title mb-4">
                      <i className="fas fa-calendar-alt"></i>
              Events Management
                    </h2>
                    
                    <Row className="g-4">
                      <Col md={6}>
                        <Card className="h-100">
                          <Card.Header>
                            <h3 className="mb-0">Add New Event</h3>
                          </Card.Header>
                          <Card.Body>
                            <Form onSubmit={handleAddEvent}>
                              <Form.Group className="mb-3">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={newEvent.title}
                                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  value={newEvent.date}
                                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  value={newEvent.time}
                                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={newEvent.location}
                                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={newEvent.description}
                                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Event Image</Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={handleEventImageUpload}
                                  accept="image/*"
                                />
                              </Form.Group>
                              <Button type="submit" variant="primary">Create Event</Button>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100">
                          <Card.Header>
                            <h3 className="mb-0">Upcoming Events</h3>
                          </Card.Header>
                          <Card.Body>
                            <div className="events-list">
                              {events.map(event => (
                                <Card key={event.id} className="mb-3">
                                  <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <Card.Title>{event.title}</Card.Title>
                                        <Card.Text>
                                          <i className="far fa-calendar-alt me-2"></i>
                                          {new Date(event.date).toLocaleDateString()}
                                          <br />
                                          <i className="far fa-clock me-2"></i>
                                          {event.time}
                                          <br />
                                          <i className="fas fa-map-marker-alt me-2"></i>
                                          {event.location}
                                        </Card.Text>
                                      </div>
                                      <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => handleDeleteEvent(event.id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Card>
                              ))}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                {/* Gallery Tab */}
                <Tab eventKey="gallery" title="Gallery">
                  <div className="admin-section">
                    <h2 className="admin-section-title mb-4">
                      <i className="fas fa-images"></i>
              Gallery Management
                    </h2>
                    
                    <Card className="mb-4">
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Upload New Image</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>

                    <Row className="g-4">
                      {gallery.map(image => (
                        <Col key={image.id} md={4} lg={3}>
                          <Card className="h-100">
                            <Card.Img 
                              variant="top" 
                              src={image.url} 
                              alt={image.caption}
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                              <Card.Text>{image.caption}</Card.Text>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <i className="fas fa-trash"></i> Delete
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
        </div>
                </Tab>

                {/* Meetings Tab */}
                <Tab eventKey="meetings" title="Meetings">
                  <div className="admin-section">
                    <h2 className="admin-section-title mb-4">
                      <i className="fas fa-handshake"></i>
                      Meetings Management
        </h2>
        
                    <Row className="g-4">
                      <Col md={6}>
                        <Card className="h-100">
                          <Card.Header>
                            <h3 className="mb-0">Schedule New Meeting</h3>
                          </Card.Header>
                          <Card.Body>
                            <Form onSubmit={handleAddMeeting}>
                              <Form.Group className="mb-3">
                                <Form.Label>Meeting Title</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={newMeeting.title}
                                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  value={newMeeting.date}
                                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  value={newMeeting.time}
                                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                                  required
                                />
                              </Form.Group>
                              <Button type="submit" variant="primary">Schedule Meeting</Button>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100">
                          <Card.Header>
                            <h3 className="mb-0">Upcoming Meetings</h3>
                          </Card.Header>
                          <Card.Body>
                            <div className="meetings-list">
                              {meetings.map(meeting => (
                                <Card key={meeting.id} className="mb-3">
                                  <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <Card.Title>{meeting.title}</Card.Title>
                                        <Card.Text>
                                          <i className="far fa-calendar-alt me-2"></i>
                                          {new Date(meeting.date).toLocaleDateString()}
                                          <br />
                                          <i className="far fa-clock me-2"></i>
                                          {meeting.time}
                                        </Card.Text>
          </div>
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handleViewMeeting(meeting)}
                                      >
                                        <i className="fas fa-eye"></i> View Attendance
                                      </Button>
          </div>
                                  </Card.Body>
                                </Card>
                              ))}
          </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
        </div>
                </Tab>

                {/* President Tab */}
                <Tab eventKey="president" title="President">
                  <div className="admin-section">
                    <h2 className="admin-section-title mb-4">
                      <i className="fas fa-user-tie"></i>
                      President Management
                    </h2>
                    <ManagePresident />
      </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={!!selectedApplication} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              {/* Add more application details as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!selectedMeeting} onHide={handleCloseAttendanceModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Meeting Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMeeting && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {approvedMembers.map(member => (
                  <tr key={member.id}>
                    <td>{member.name} {member.surname}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedMeeting.attendees.includes(member.id)}
                        onChange={(e) => handleUpdateAttendance(selectedMeeting.id, member.id, e.target.checked)}
                        label={selectedMeeting.attendees.includes(member.id) ? "Present" : "Absent"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAttendanceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard; 