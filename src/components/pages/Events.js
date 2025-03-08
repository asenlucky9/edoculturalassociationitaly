import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';
import './Events.css';

const Events = () => {
  const { events } = useShared();

  return (
    <div className="content-without-hero">
      <Container>
        <h1 className="section-title text-center mb-5">Upcoming Events</h1>
        <Row className="g-4">
          {events.length > 0 ? (
            events.map((event) => (
              <Col key={event.id} md={6} lg={4}>
                <Card className="h-100 event-card">
                  {event.image && (
                    <Card.Img
                      variant="top"
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                    />
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
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center text-muted">No upcoming events at this time.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Events; 