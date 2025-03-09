import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const EventsManagement = () => {
  const { events, addEvent, deleteEvent } = useShared();
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewEvent(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      ...newEvent,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    addEvent(event);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: null
    });
    setPreviewImage(null);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setPreviewImage(event.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Events Management</h2>
      
      {/* Add New Event Form */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">{newEvent.id ? 'Edit Event' : 'Add New Event'}</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-3"
              />
              {previewImage && (
                <div className="mt-2 position-relative" style={{ maxWidth: '200px' }}>
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fluid
                    className="rounded"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-1"
                    onClick={() => {
                      setPreviewImage(null);
                      setNewEvent(prev => ({ ...prev, image: null }));
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              )}
            </Form.Group>
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                {newEvent.id ? 'Update Event' : 'Add Event'}
              </Button>
              {newEvent.id && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setNewEvent({
                      title: '',
                      date: '',
                      time: '',
                      location: '',
                      description: '',
                      image: null
                    });
                    setPreviewImage(null);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Events List */}
      <h3 className="mb-3">Manage Events</h3>
      <Row className="g-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Col key={event.id} md={6} lg={4}>
              <Card className="h-100">
                {event.image && (
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={event.image}
                      alt={event.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <i className="far fa-calendar-alt me-2"></i>
                    {new Date(event.date).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text className="text-muted mb-2">
                    <i className="far fa-clock me-2"></i>
                    {event.time}
                  </Card.Text>
                  <Card.Text className="text-muted mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {event.location}
                  </Card.Text>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No events found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EventsManagement; 