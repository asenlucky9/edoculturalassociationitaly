import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const MeetingsManagement = () => {
  const { meetings, addMeeting, updateMeeting, deleteMeeting } = useShared();
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    attendees: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeeting(newMeeting);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      attendees: []
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      deleteMeeting(id);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Meetings Management</h2>
      
      {/* Add Meeting Form */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Add New Meeting</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newMeeting.location}
                onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMeeting.description}
                onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Add Meeting</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Meetings List */}
      <h3 className="mb-3">Scheduled Meetings</h3>
      {meetings && meetings.length > 0 ? (
        <Row>
          {meetings.map((meeting) => (
            <Col md={6} lg={4} key={meeting.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{meeting.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(meeting.date).toLocaleDateString()}<br />
                    <strong>Time:</strong> {meeting.time}<br />
                    <strong>Location:</strong> {meeting.location}<br />
                    <strong>Description:</strong><br />
                    {meeting.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-primary"
                      onClick={() => updateMeeting(meeting.id, { ...meeting, status: 'completed' })}
                    >
                      Mark as Completed
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(meeting.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center p-4">
          <Card.Body>
            <p className="mb-0">No meetings scheduled. Add a new meeting to get started.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MeetingsManagement; 