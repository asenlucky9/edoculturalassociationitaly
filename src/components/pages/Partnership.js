import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const Partnership = () => {
  const { addPartnershipRequest } = useShared();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    description: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPartnershipRequest({
      ...formData,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    setShowSuccess(true);
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      partnershipType: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">Partner with Us</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  Thank you for your interest in partnering with us! We will review your application and contact you soon.
                </Alert>
              )}

              <p className="text-center mb-4">
                Join us in promoting cultural diversity and community engagement in Udine. 
                Fill out the form below to start the partnership process.
              </p>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Organization Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Person*</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type of Partnership*</Form.Label>
                  <Form.Select
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="cultural">Cultural Organization</option>
                    <option value="educational">Educational Institution</option>
                    <option value="business">Business</option>
                    <option value="nonprofit">Non-Profit Organization</option>
                    <option value="media">Media Partner</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Partnership Description*</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe how you would like to partner with us and what you hope to achieve through this partnership."
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                  Submit Partnership Request
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Partnership; 