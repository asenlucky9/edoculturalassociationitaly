import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  // Gallery data with actual images
  const galleryImages = [
    {
      id: 1,
      title: 'Cultural Festival',
      image: '/images/festival.jpg',
      description: 'Annual Edo Cultural Festival in Italy'
    },
    {
      id: 2,
      title: 'Traditional Dance',
      image: '/images/dance.jpg',
      description: 'Traditional Edo dance performance'
    },
    {
      id: 3,
      title: 'Community Event',
      image: '/images/community.jpg',
      description: 'Community gathering and celebration'
    },
    {
      id: 4,
      title: 'Cultural Workshop',
      image: '/images/workshop.jpg',
      description: 'Cultural education and workshops'
    }
  ];

  return (
    <div className="home-page">
      {/* Featured Section */}
      <section className="section featured-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="section-title text-start mb-4">Preserving Edo Culture in Italy</h2>
              <p className="lead mb-4">
                The Edo Cultural Association Italy is dedicated to preserving and promoting the rich cultural heritage of the Edo people in Italy. Through various programs and events, we strive to keep our traditions alive and share them with the wider community.
              </p>
              <p className="mb-4">
                Join us in celebrating our culture through traditional performances, educational workshops, and community gatherings. Together, we can ensure that the Edo cultural legacy continues to thrive in Italy.
              </p>
            </Col>
            <Col lg={6}>
              <div className="featured-image-container">
                <img 
                  src="/images/edo-culture.jpg" 
                  alt="Edo Cultural Heritage" 
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Our Cultural Journey</h2>
          <Row className="g-4">
            {galleryImages.map((item) => (
              <Col key={item.id} md={6} lg={3}>
                <Card className="gallery-card h-100">
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                    alt={item.title}
                    className="gallery-image"
                  />
                  <Card.Body>
                    <Card.Title className="h5 mb-2">{item.title}</Card.Title>
                    <Card.Text className="text-muted">{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="section events-section">
        <Container>
          <h2 className="section-title text-center mb-5">Upcoming Events</h2>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="event-card h-100">
                <Card.Body>
                  <div className="event-date mb-3">
                    <span className="badge bg-primary">June 15, 2024</span>
                  </div>
                  <Card.Title className="h5">Cultural Festival 2024</Card.Title>
                  <Card.Text>
                    Join us for our annual cultural festival featuring traditional performances, food, and art exhibitions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="event-card h-100">
                <Card.Body>
                  <div className="event-date mb-3">
                    <span className="badge bg-primary">July 1, 2024</span>
                  </div>
                  <Card.Title className="h5">Traditional Dance Workshop</Card.Title>
                  <Card.Text>
                    Learn traditional Edo dance moves in this interactive workshop for all skill levels.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="event-card h-100">
                <Card.Body>
                  <div className="event-date mb-3">
                    <span className="badge bg-primary">August 10, 2024</span>
                  </div>
                  <Card.Title className="h5">Community Picnic</Card.Title>
                  <Card.Text>
                    A day of community bonding with traditional food, games, and cultural activities.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <h2 className="section-title">Latest News</h2>
        <div className="card-grid">
          {/* News cards will be dynamically added here */}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Photo Gallery</h2>
        <div className="card-grid">
          {/* Gallery items will be dynamically added here */}
        </div>
      </section>

      <section className="features">
        <div className="grid">
          <div className="feature-card">
            <h3>Our Mission</h3>
            <p>To promote and preserve Edo cultural heritage in Italy while fostering unity and support among members.</p>
          </div>
          <div className="feature-card">
            <h3>Cultural Events</h3>
            <p>Join us in celebrating traditional festivals, cultural exhibitions, and community gatherings.</p>
          </div>
          <div className="feature-card">
            <h3>Community Support</h3>
            <p>Building a strong network of support for Edo people living in Italy.</p>
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

      <section className="join-us">
        <div className="join-content">
          <h2>Become a Member</h2>
          <p>Join our growing community and be part of something special.</p>
          <button className="btn">Register Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home; 