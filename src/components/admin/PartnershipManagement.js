import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const PartnershipManagement = () => {
  const { partnerships = [], addPartnership, updatePartnership, deletePartnership } = useShared();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newPartnership, setNewPartnership] = useState({
    name: '',
    description: '',
    website: '',
    logo: '',
    status: 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await addPartnership(newPartnership);
      setSuccessMessage('Partnership added successfully!');
      setNewPartnership({
        name: '',
        description: '',
        website: '',
        logo: '',
        status: 'pending'
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add partnership. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partnership?')) {
      setIsLoading(true);
      setError(null);
      try {
        await deletePartnership(id);
        setSuccessMessage('Partnership deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete partnership. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      await updatePartnership(id, { status: newStatus });
      setSuccessMessage('Partnership status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update partnership status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Partnership Management</h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      
      {/* Add Partnership Form */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Add New Partnership</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPartnership.name}
                    onChange={(e) => setNewPartnership({ ...newPartnership, name: e.target.value })}
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    value={newPartnership.website}
                    onChange={(e) => setNewPartnership({ ...newPartnership, website: e.target.value })}
                    required
                    pattern="https?://.*"
                    isInvalid={newPartnership.website && !validateUrl(newPartnership.website)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid URL (starting with http:// or https://)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                type="url"
                value={newPartnership.logo}
                onChange={(e) => setNewPartnership({ ...newPartnership, logo: e.target.value })}
                required
                pattern="https?://.*"
                isInvalid={newPartnership.logo && !validateUrl(newPartnership.logo)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid URL (starting with http:// or https://)
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newPartnership.description}
                onChange={(e) => setNewPartnership({ ...newPartnership, description: e.target.value })}
                required
                minLength={10}
                maxLength={500}
              />
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Adding...
                </>
              ) : (
                'Add Partnership'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Partnerships List */}
      <h3 className="mb-3">Current Partnerships</h3>
      {Array.isArray(partnerships) && partnerships.length > 0 ? (
        <Row>
          {partnerships.map((partnership) => (
            <Col md={6} lg={4} key={partnership.id} className="mb-4">
              <Card>
                {partnership.logo && (
                  <Card.Img
                    variant="top"
                    src={partnership.logo}
                    alt={partnership.name}
                    style={{ height: '150px', objectFit: 'contain', padding: '1rem' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-logo.png';
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{partnership.name}</Card.Title>
                  <Card.Text>{partnership.description}</Card.Text>
                  {partnership.website && (
                    <Card.Link href={partnership.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </Card.Link>
                  )}
                  <div className="mt-3">
                    <Form.Select
                      value={partnership.status}
                      onChange={(e) => handleStatusChange(partnership.id, e.target.value)}
                      className="mb-2"
                      disabled={isLoading}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(partnership.id)}
                      className="w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
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
            <p className="mb-0">No partnerships yet. Add some partnerships to get started.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PartnershipManagement; 