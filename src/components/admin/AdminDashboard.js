import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Container, Row, Col, Table, Button, Badge, Tabs, Tab, Card, Form, Modal } from 'react-bootstrap';
import { useMemberCount } from '../../context/MemberContext';

const AdminDashboard = () => {
  const { applications, approveApplication, rejectApplication, getApplicationsByStatus } = useMemberCount();
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
    const filteredApplications = getApplicationsByStatus(status);
    
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
                      onClick={() => approveApplication(app.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => rejectApplication(app.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Tabs
        activeKey={activeMainTab}
        onSelect={(k) => setActiveMainTab(k)}
        className="mb-4"
      >
        {/* Membership Management Tab */}
        <Tab eventKey="membership" title="Membership Management">
          <Row className="mb-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Pending Applications</Card.Title>
                  <Card.Text className="display-4">
                    {getApplicationsByStatus('pending').length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Approved Members</Card.Title>
                  <Card.Text className="display-4">
                    {getApplicationsByStatus('approved').length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Rejected Applications</Card.Title>
                  <Card.Text className="display-4">
                    {getApplicationsByStatus('rejected').length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Tabs
            activeKey={activeMembershipTab}
            onSelect={(k) => setActiveMembershipTab(k)}
            className="mb-3"
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
        </Tab>

        {/* Events Management Tab */}
        <Tab eventKey="events" title="Events Management">
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Add New Event</Card.Title>
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
                        accept="image/*"
                        onChange={handleEventImageUpload}
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">Add Event</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <h3>Upcoming Events</h3>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.time}</td>
                      <td>{event.location}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Tab>

        {/* Gallery Management Tab */}
        <Tab eventKey="gallery" title="Gallery Management">
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Upload New Image</Card.Title>
                  <Form.Group>
                    <Form.Label>Select Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Row>
                {gallery.map(image => (
                  <Col md={4} key={image.id} className="mb-4">
                    <Card>
                      <Card.Img variant="top" src={image.url} />
                      <Card.Body>
                        <Card.Title>{image.caption}</Card.Title>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Tab>

        {/* Meetings & Attendance Tab */}
        <Tab eventKey="meetings" title="Meetings & Attendance">
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Schedule New Meeting</Card.Title>
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
            <Col md={8}>
              <h3>Scheduled Meetings</h3>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Attendees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map(meeting => (
                    <tr key={meeting.id}>
                      <td>{meeting.title}</td>
                      <td>{meeting.date}</td>
                      <td>{meeting.time}</td>
                      <td>{meeting.attendees?.length || 0}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {/* Handle view attendance */}}
                        >
                          View Attendance
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {/* Handle delete meeting */}}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard; 