import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useMemberContext } from '../../context/MemberContext';

const Membership = () => {
  const { addMember } = useMemberContext();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    occupation: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      // Validate required fields
      const requiredFields = ['name', 'surname', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Add status and submission date to the member data
      const memberData = {
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        id: Date.now()
      };

      // Add member using context
      addMember(memberData);
      
      // Clear form and show success message
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        occupation: '',
        interests: ''
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your application. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Membership Registration</h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          Your membership application has been submitted successfully! We will review it and get back to you soon.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surname *</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone *</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interests</Form.Label>
          <Form.Control
            as="textarea"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Tell us about your interests in Edo culture..."
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit Application
        </Button>
      </Form>
    </Container>
  );
};

export default Membership; 