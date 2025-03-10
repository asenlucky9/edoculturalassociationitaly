import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { useShared } from '../../context/SharedContext';
import { toast } from 'react-toastify';

const ManagePresident = () => {
  const { president, updatePresident } = useShared();
  const [presidentInfo, setPresidentInfo] = useState(president);
  const [previewImage, setPreviewImage] = useState(null);

  // Load president data when component mounts
  useEffect(() => {
    setPresidentInfo(president);
  }, [president]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPresidentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Read the file as Data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPresidentInfo(prev => ({
          ...prev,
          image: reader.result // Store the image as base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setPresidentInfo(president);
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to localStorage through context
      updatePresident(presidentInfo);
      
      // Show success message
      toast.success('President information updated successfully!');
    } catch (error) {
      console.error('Error saving president info:', error);
      toast.error('Failed to update president information');
    }
  };

  return (
    <Container className="py-4">
      <Card className="admin-section">
        <Card.Body>
          <h2 className="admin-section-title">
            <i className="fas fa-user-tie"></i>
            Manage President Information
          </h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>President's Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={presidentInfo.name}
                onChange={handleInputChange}
                placeholder="Dr. John Doe"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Year Started Office</Form.Label>
              <Form.Control
                type="number"
                name="yearStarted"
                value={presidentInfo.yearStarted}
                onChange={handleInputChange}
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>President's Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={presidentInfo.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Enter the president's message here..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>President's Image</Form.Label>
              <div className="d-flex align-items-center gap-4 mb-3">
                <Image
                  src={previewImage || presidentInfo.image}
                  alt="President Preview"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  className="rounded"
                />
                <div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  <small className="text-muted">
                    Recommended size: 800x1000 pixels
                  </small>
                </div>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset Changes
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManagePresident; 