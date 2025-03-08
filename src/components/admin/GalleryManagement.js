import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';

const GalleryManagement = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useShared();
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'event'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGalleryItem(newItem);
    setNewItem({
      title: '',
      description: '',
      imageUrl: '',
      category: 'event'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      deleteGalleryItem(id);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gallery Management</h2>
      
      {/* Add Gallery Item Form */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Add New Gallery Item</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    required
                  >
                    <option value="event">Event</option>
                    <option value="cultural">Cultural</option>
                    <option value="community">Community</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Add to Gallery</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Gallery Items List */}
      <h3 className="mb-3">Gallery Items</h3>
      {gallery && gallery.length > 0 ? (
        <Row>
          {gallery.map((item) => (
            <Col md={6} lg={4} key={item.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
                  <Card.Text>{item.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      onClick={() => updateGalleryItem(item.id, { ...item, featured: !item.featured })}
                    >
                      {item.featured ? 'Remove from Featured' : 'Mark as Featured'}
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
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
            <p className="mb-0">No gallery items yet. Add some items to get started.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default GalleryManagement; 