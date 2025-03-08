import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonation = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    // Reset form
    setAmount('');
    setPaymentMethod('');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">Support Our Mission</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  Thank you for your support! Please proceed with the payment using your selected method.
                </Alert>
              )}

              <p className="text-center mb-4">
                Your donation helps us preserve and promote Edo culture in Udine through cultural events, 
                educational programs, and community support initiatives.
              </p>

              <Form onSubmit={handleDonation}>
                <Form.Group className="mb-4">
                  <Form.Label>Select Amount</Form.Label>
                  <div className="d-flex gap-2 mb-3">
                    {['20', '50', '100', '200'].map((value) => (
                      <Button
                        key={value}
                        variant={amount === value ? 'primary' : 'outline-primary'}
                        onClick={() => setAmount(value)}
                        className="flex-grow-1"
                      >
                        €{value}
                      </Button>
                    ))}
                  </div>
                  <Form.Control
                    type="number"
                    placeholder="Other amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Payment Method</Form.Label>
                  <div className="d-grid gap-2">
                    <Button
                      variant={paymentMethod === 'bank' ? 'primary' : 'outline-primary'}
                      onClick={() => setPaymentMethod('bank')}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="fas fa-university"></i> Bank Transfer
                    </Button>
                  </div>
                </Form.Group>

                {paymentMethod === 'bank' && (
                  <div className="bank-details p-3 bg-light rounded mb-4">
                    <h5 className="mb-3">Bank Transfer Details</h5>
                    <p className="mb-2"><strong>Bank:</strong> Your Bank Name</p>
                    <p className="mb-2"><strong>Account Name:</strong> Edo Cultural Association Udine</p>
                    <p className="mb-2"><strong>IBAN:</strong> IT00 XXXX XXXX XXXX XXXX</p>
                    <p className="mb-2"><strong>BIC/SWIFT:</strong> XXXXXXXX</p>
                    <p className="mb-0"><strong>Reference:</strong> Donation-[Your Name]</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  disabled={!amount || !paymentMethod}
                >
                  Donate €{amount}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <p className="text-muted">
              For any questions about donations, please contact us at:<br />
              <strong>email@edoculturalassociationudine.it</strong>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Donate; 