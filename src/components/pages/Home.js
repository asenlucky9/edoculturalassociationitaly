import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const Home = () => {
  const { events } = useShared();

  // Get only upcoming events (events with dates in the future)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3); // Show only the next 3 upcoming events

  return (
    <div className="home-page">
      {/* Featured Section */}
      <section className="section featured-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="section-title text-start mb-4">Preserving Edo Culture in Udine, Italy</h2>
              <p className="lead mb-4">
                The Edo Cultural Association Udine Italy is dedicated to preserving and promoting the rich cultural heritage of the Edo people in Udine, Italy. Through various programs and events, we strive to keep our traditions alive and share them with the wider community.
              </p>
              <p className="mb-4">
                Join us in celebrating our culture through traditional performances, educational workshops, and community gatherings. Together, we can ensure that the Edo cultural legacy continues to thrive in Udine.
              </p>
            </Col>
            <Col lg={6}>
              <div className="featured-image-container">
                <img 
                  src="/images/edo-culture.jpg" 
                  alt="Edo Cultural Heritage in Udine" 
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="section events-section">
        <Container>
          <h2 className="section-title text-center mb-5">Upcoming Events</h2>
          <Row className="g-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
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
                    <Card.Footer className="bg-transparent border-0 pb-3">
                      <Link to="/events" className="btn btn-outline-primary w-100">
                        Learn More
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center text-muted">No upcoming events at this time.</p>
              </Col>
            )}
          </Row>
          {upcomingEvents.length > 0 && (
            <div className="text-center mt-5">
              <Link to="/events" className="btn btn-primary btn-lg">
                View All Events
              </Link>
            </div>
          )}
        </Container>
      </section>

      <section className="features">
        <div className="grid">
          <div className="feature-card">
            <h3>Our Mission</h3>
            <p>To promote and preserve Edo cultural heritage in Udine while fostering unity and support among members.</p>
          </div>
          <div className="feature-card">
            <h3>Cultural Events</h3>
            <p>Join us in celebrating traditional festivals, cultural exhibitions, and community gatherings in Udine.</p>
          </div>
          <div className="feature-card">
            <h3>Community Support</h3>
            <p>Building a strong network of support for Edo people living in Udine, Italy.</p>
          </div>
        </div>
      </section>

      <section className="president-section">
        <div className="president-content">
          <img 
            src="/president-image.jpg" 
            alt="Association President"
            className="president-image"
          />
          <div className="president-info">
            <h2>Message from the President</h2>
            <p>Welcome to our cultural family. Together, we strive to maintain our rich heritage while embracing our new home in Italy.</p>
            <span className="president-name">- King Luca</span>
          </div>
        </div>
      </section>

      <section className="support-us">
        <div className="support-content">
          <h2>Support Our Mission</h2>
          <p>Help us preserve and promote Edo culture in Udine through your generous support.</p>
          <div className="support-options">
            <div className="support-card">
              <i className="fas fa-hand-holding-heart"></i>
              <h3>Make a Donation</h3>
              <p>Your financial support helps us organize cultural events and support our community.</p>
              <Link to="/donate" className="btn btn-outline-primary">Donate Now</Link>
            </div>
            <div className="support-card">
              <i className="fas fa-users"></i>
              <h3>Volunteer</h3>
              <p>Share your time and skills to help organize and run our cultural programs.</p>
              <button className="btn btn-outline-primary">Join as Volunteer</button>
            </div>
            <div className="support-card">
              <i className="fas fa-handshake"></i>
              <h3>Partner with Us</h3>
              <p>Collaborate with us to promote cultural diversity and community engagement.</p>
              <Link to="/partnership" className="btn btn-outline-primary">Become a Partner</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="join-us">
        <div className="join-content">
          <h2>Become a Member</h2>
          <p>Join our growing community and be part of something special.</p>
          <Link to="/membership" className="btn btn-primary btn-lg" role="button">
            Join Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 