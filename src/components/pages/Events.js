import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          // Sort events by date
          const sortedEvents = parsedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    // Load events initially
    loadEvents();

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'events') {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="events-page">
      <Container>
        <h2 className="text-center mb-4">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.map((event, index) => (
              <Card key={index} className="event-card">
                {event.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={event.imageUrl}
                    alt={event.title}
                    className="event-image"
                  />
                )}
                <Card.Body>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-details">
                    <p>
                      <FontAwesomeIcon icon={faCalendar} className="me-2" />
                      {formatDate(event.date)}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faClock} className="me-2" />
                      {formatTime(event.time)}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                      {event.location}
                    </p>
                  </div>
                  <div className="event-description">
                    {event.description}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">No upcoming events at this time.</p>
        )}
      </Container>
    </div>
  );
};

export default Events; 