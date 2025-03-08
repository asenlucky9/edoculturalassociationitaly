import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <Container className="py-5">
      <div className="admin-section">
        <h2 className="admin-section-title">
          <i className="fas fa-tachometer-alt"></i>
          Dashboard Overview
        </h2>
        
        <div className="admin-grid">
          {/* Membership Management */}
          <Link to="/admin/membership" className="management-link">
            <h3 className="management-title">
              <i className="fas fa-users me-2"></i>
              Membership Management
            </h3>
            <p className="management-description">
              Manage member registrations, approvals, and member information
            </p>
          </Link>

          {/* Events Management */}
          <Link to="/admin/events" className="management-link">
            <h3 className="management-title">
              <i className="fas fa-calendar-alt me-2"></i>
              Events Management
            </h3>
            <p className="management-description">
              Create and manage cultural events, workshops, and gatherings
            </p>
          </Link>

          {/* Gallery Management */}
          <Link to="/admin/gallery" className="management-link">
            <h3 className="management-title">
              <i className="fas fa-images me-2"></i>
              Gallery Management
            </h3>
            <p className="management-description">
              Upload and organize photos from events and cultural activities
            </p>
          </Link>

          {/* Meetings & Attendance */}
          <Link to="/admin/meetings" className="management-link">
            <h3 className="management-title">
              <i className="fas fa-clipboard-list me-2"></i>
              Meetings & Attendance
            </h3>
            <p className="management-description">
              Track meeting schedules and member attendance
            </p>
          </Link>
        </div>
      </div>

      {/* Applications Section */}
      <div className="admin-section applications-section">
        <h2 className="admin-section-title">
          <i className="fas fa-clipboard-check"></i>
          Application Status
        </h2>
        
        <div className="applications-grid">
          {/* Pending Applications */}
          <div className="application-stat-card">
            <div className="application-count status-pending">12</div>
            <div className="application-label">Pending Applications</div>
          </div>

          {/* Approved Members */}
          <div className="application-stat-card">
            <div className="application-count status-approved">45</div>
            <div className="application-label">Approved Members</div>
          </div>

          {/* Rejected Applications */}
          <div className="application-stat-card">
            <div className="application-count status-rejected">3</div>
            <div className="application-label">Rejected Applications</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard; 