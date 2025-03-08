import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'animate.css';
import { WelcomeAnimation } from './LottieAnimations';
import { useMemberCount } from '../context/MemberContext';

const HeroSection = () => {
  const { memberCount } = useMemberCount();

  useEffect(() => {
    // Add animation classes when component mounts
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(element => {
      element.style.opacity = '0';
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
          }
        });
      });
      observer.observe(element);
    });
  }, []);

  return (
    <div className="hero-section position-relative overflow-hidden">
      {/* Background overlay with pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.03) 0%, rgba(13, 71, 161, 0.03) 100%)',
          backgroundSize: '10px 10px',
          opacity: 0.5,
          zIndex: 1
        }}
      />

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center min-vh-75">
          <Col md={6} className="text-center text-md-start mb-5 mb-md-0">
            <div className="animate__animated animate__fadeInLeft animate__delay-0.5s">
              <h1 className="display-4 fw-bold mb-4 text-gradient-primary">
                Welcome to Edo Cultural Association Italy
              </h1>
              <p className="lead mb-4 text-muted">
                Preserving and promoting Edo culture in Italy through education, events, and community engagement.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-4 py-2 btn-hover-effect animate__animated animate__fadeInUp animate__delay-1s"
                >
                  Join Us <i className="fas fa-arrow-right ms-2"></i>
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  className="px-4 py-2 btn-hover-effect animate__animated animate__fadeInUp animate__delay-1.2s"
                >
                  Learn More
                </Button>
              </div>
              <div className="member-counter-section animate__animated animate__fadeInUp animate__delay-2s">
                <div className="member-counter">
                  <div className="counter-value">{memberCount}</div>
                  <div className="counter-label">Active Members</div>
                </div>
                <div className="counter-description">
                  Join our growing community of cultural enthusiasts
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="position-relative animate__animated animate__fadeInRight animate__delay-0.8s">
              <div className="image-container">
                <img
                  src="/images/portrait.jpg"
                  alt="Edo Cultural Heritage"
                  className="img-fluid rounded-lg shadow-lg hover-scale"
                  style={{
                    maxHeight: '450px',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div className="image-overlay">
                  <h5 className="mb-0 fw-bold">Edo Cultural Heritage</h5>
                  <p className="mb-0 mt-2 small">Celebrating our rich traditions</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="position-absolute top-0 end-0 translate-middle-y d-none d-md-block">
                <div className="rounded-circle bg-primary opacity-10" style={{ width: '200px', height: '200px' }}></div>
              </div>
              <div className="position-absolute bottom-0 start-0 translate-middle d-none d-md-block">
                <div className="rounded-circle bg-secondary opacity-10" style={{ width: '150px', height: '150px' }}></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection; 