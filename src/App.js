import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Logo from './components/Logo';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Events from './components/pages/Events';
import Gallery from './components/pages/Gallery';
import Membership from './components/pages/Membership';
import Contact from './components/pages/Contact';
import Donate from './components/pages/Donate';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { MemberProvider, useMemberCount } from './context/MemberContext';
import HeroSection from './components/HeroSection';
import MembershipManagement from './components/admin/MembershipManagement';
import EventsManagement from './components/admin/EventsManagement';
import GalleryManagement from './components/admin/GalleryManagement';
import MeetingsManagement from './components/admin/MeetingsManagement';
import { SharedProvider } from './context/SharedContext';
import Partnership from './components/pages/Partnership';
import PartnershipManagement from './components/admin/PartnershipManagement';
import { LoadingAnimation } from './components/LottieAnimations';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

const PublicNavbar = ({ scrolled }) => {
  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Logo />
          <span className="ms-2 brand-text">
            Edo Cultural Association
            <small className="d-block text-gradient">Udine, Italy</small>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <NavDropdown title="Programs" id="programs-dropdown">
              <NavDropdown.Item as={Link} to="/events">Events</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gallery">Gallery</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/membership">Membership Registration</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
            <Nav.Link as={Link} to="/admin" className="admin-link">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

    return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/admin/dashboard">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/membership">Membership</Nav.Link>
            <Nav.Link as={Link} to="/admin/events">Events</Nav.Link>
            <Nav.Link as={Link} to="/admin/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/admin/partnerships">Partnerships</Nav.Link>
            <Nav.Link as={Link} to="/admin/meetings">Meetings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Footer = () => {
  const { memberCount } = useMemberCount();

    return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="fw-bold mb-4">About Us</h5>
            <p className="text-muted">Edo Cultural Association Italy is dedicated to preserving and promoting Edo culture in Italy through various cultural programs and community initiatives.</p>
            <div className="mt-3">
              <Button variant="outline-light" size="sm" className="me-2">
                <i className="fas fa-envelope me-2"></i>Contact
              </Button>
              <Button variant="outline-light" size="sm">
                <i className="fas fa-calendar me-2"></i>Events
              </Button>
            </div>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-muted text-decoration-none hover-light">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none hover-light">About</Link></li>
              <li className="mb-2"><Link to="/events" className="text-muted text-decoration-none hover-light">Events</Link></li>
              <li className="mb-2"><Link to="/gallery" className="text-muted text-decoration-none hover-light">Gallery</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-muted text-decoration-none hover-light">Contact</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-4">Connect With Us</h5>
            <div className="social-links">
              <a href="https://facebook.com/edoculturalitaly" target="_blank" rel="noopener noreferrer" className="hover-light">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/edoculturalitaly" target="_blank" rel="noopener noreferrer" className="hover-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/edoculturalitaly" target="_blank" rel="noopener noreferrer" className="hover-light">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/edoculturalitaly" target="_blank" rel="noopener noreferrer" className="hover-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Newsletter</h6>
              <div className="input-group">
                <input type="email" className="form-control bg-dark text-light border-secondary" placeholder="Enter your email" />
                <Button variant="primary">Subscribe</Button>
            </div>
            </div>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">
              &copy; 2024 Edo Cultural Association Italy. All rights reserved. | 
              <span className="ms-2">
                <i className="fas fa-users me-1"></i>
                {memberCount} Members
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
      setShowScrollTop(offset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    return (
    <div className="App">
      {/* Navigation */}
      {isAdminPage ? <AdminNavbar /> : <PublicNavbar scrolled={scrolled} />}

      {/* Main Content */}
      <main className={`py-5 ${!isHomePage ? 'content-without-hero' : ''} ${isAdminPage ? 'admin-content' : ''}`}>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <HeroSection />
                <Home />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/partnership" element={<Partnership />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/membership"
              element={
                <ProtectedRoute>
                  <MembershipManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <EventsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <GalleryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/partnerships"
              element={
                <ProtectedRoute>
                  <PartnershipManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/meetings"
              element={
                <ProtectedRoute>
                  <MeetingsManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </main>

      {/* Footer - Only show on public pages */}
      {!isAdminPage && <Footer />}

      {/* Scroll to Top Button */}
      {showScrollTop && !isAdminPage && (
        <Button 
          variant="primary" 
          className="scroll-top rounded-circle shadow"
          onClick={scrollToTop}
        >
          <i className="fas fa-arrow-up"></i>
        </Button>
      )}
            </div>
    );
};

const App = () => {
    return (
    <SharedProvider>
      <MemberProvider>
            <Router>
          <AppContent />
            </Router>
      </MemberProvider>
    </SharedProvider>
    );
};

export default App;
