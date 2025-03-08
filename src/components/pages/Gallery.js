import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';
import './Gallery.css';

const Gallery = () => {
  const { gallery } = useShared();

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Our Gallery</h1>
      <Row className="g-4">
        {gallery.length > 0 ? (
          gallery.map((item) => (
            <Col key={item.id} md={4} lg={3}>
              <Card className="gallery-card h-100">
                <div className="gallery-image-container">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="h5">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No images in the gallery yet.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Gallery; 