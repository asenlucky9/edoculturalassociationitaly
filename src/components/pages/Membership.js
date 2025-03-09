import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useMemberContext } from '../../context/MemberContext';

const Membership = () => {
  const { addMember } = useMemberContext();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    otherName: '',
    homeAddress: '',
    dob: '',
    townCity: '',
    localGovt: '',
    country: '',
    passportId: '',
    codiceFiscale: '',
    phone: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinAddress: '',
    nextOfKinCity: '',
    nextOfKinCountry: '',
    isMarried: false,
    partnerName: '',
    childrenCount: '',
    childrenNames: '',
    parentsStatus: '',
    association: '',
    criminalRecord: false,
    reason: '',
    agreement: false,
    passportPhoto: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const requiredFields = [
        'surname', 
        'name', 
        'homeAddress',
        'country', 
        'dob', 
        'phone', 
        'passportId',
        'codiceFiscale',
        'nextOfKinName',
        'nextOfKinPhone',
        'parentsStatus',
        'reason'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      if (!formData.agreement) {
        throw new Error('You must agree to the terms and conditions');
      }

      if (!formData.passportPhoto) {
        throw new Error('Please upload your passport photo');
      }

      addMember(formData);
      
      setFormData({
        surname: '',
        name: '',
        otherName: '',
        homeAddress: '',
        dob: '',
        townCity: '',
        localGovt: '',
        country: '',
        passportId: '',
        codiceFiscale: '',
        phone: '',
        nextOfKinName: '',
        nextOfKinPhone: '',
        nextOfKinAddress: '',
        nextOfKinCity: '',
        nextOfKinCountry: '',
        isMarried: false,
        partnerName: '',
        childrenCount: '',
        childrenNames: '',
        parentsStatus: '',
        association: '',
        criminalRecord: false,
        reason: '',
        agreement: false,
        passportPhoto: null
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your application.');
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body className="p-3">
          <h3 className="text-center mb-3">EDO Cultural Association Membership Registration</h3>
      
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
              Your membership application has been submitted successfully!
        </Alert>
      )}

          <Form onSubmit={handleSubmit} className="smaller-form">
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white py-2">
                <h6 className="mb-0">Personal Information</h6>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  <Col md={4}>
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
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Other Names</Form.Label>
                      <Form.Control
                        type="text"
                        name="otherName"
                        value={formData.otherName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Home Address *</Form.Label>
                      <Form.Control
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
        <Form.Group className="mb-3">
                      <Form.Label>Date of Birth *</Form.Label>
          <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country of Residence *</Form.Label>
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="Italy">Italy</option>
                        <option value="Nigeria">Nigeria</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Town/City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="townCity"
                        value={formData.townCity}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Local Government</Form.Label>
                      <Form.Control
                        type="text"
                        name="localGovt"
                        value={formData.localGovt}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
        <Form.Group className="mb-3">
                      <Form.Label>Phone Number *</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Passport ID *</Form.Label>
                      <Form.Control
                        type="text"
                        name="passportId"
                        value={formData.passportId}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Codice Fiscale *</Form.Label>
                      <Form.Control
                        type="text"
                        name="codiceFiscale"
                        value={formData.codiceFiscale}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header className="bg-primary text-white py-2">
                <h6 className="mb-0">Next of Kin Information</h6>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next of Kin Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nextOfKinName"
                        value={formData.nextOfKinName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next of Kin Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="nextOfKinPhone"
                        value={formData.nextOfKinPhone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next of Kin Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="nextOfKinAddress"
                        value={formData.nextOfKinAddress}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next of Kin City</Form.Label>
                      <Form.Control
                        type="text"
                        name="nextOfKinCity"
                        value={formData.nextOfKinCity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next of Kin Country</Form.Label>
                      <Form.Select
                        name="nextOfKinCountry"
                        value={formData.nextOfKinCountry}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>
                        <option value="Italy">Italy</option>
                        <option value="Nigeria">Nigeria</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header className="bg-primary text-white py-2">
                <h6 className="mb-0">Family Information</h6>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Are you married?"
                        name="isMarried"
                        checked={formData.isMarried}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {formData.isMarried && (
                  <Row>
                    <Col md={12}>
        <Form.Group className="mb-3">
                        <Form.Label>Partner's Name</Form.Label>
          <Form.Control
                          type="text"
                          name="partnerName"
                          value={formData.partnerName}
            onChange={handleChange}
          />
        </Form.Group>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Number of Children</Form.Label>
                      <Form.Control
                        type="number"
                        name="childrenCount"
                        value={formData.childrenCount}
                        onChange={handleChange}
                        min="0"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Parents Status *</Form.Label>
                      <Form.Select
                        name="parentsStatus"
                        value={formData.parentsStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select status</option>
                        <option value="bothAlive">Both Alive</option>
                        <option value="fatherDeceased">Father Deceased</option>
                        <option value="motherDeceased">Mother Deceased</option>
                        <option value="bothDeceased">Both Deceased</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {formData.childrenCount > 0 && (
                  <Row>
                    <Col md={12}>
        <Form.Group className="mb-3">
                        <Form.Label>Children's Names (comma separated)</Form.Label>
          <Form.Control
                          type="text"
                          name="childrenNames"
                          value={formData.childrenNames}
            onChange={handleChange}
                          placeholder="e.g., John, Jane, Mary"
          />
        </Form.Group>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header className="bg-primary text-white py-2">
                <h6 className="mb-0">Additional Information</h6>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  <Col md={12}>
        <Form.Group className="mb-3">
                      <Form.Label>Association Membership</Form.Label>
          <Form.Control
            type="text"
                        name="association"
                        value={formData.association}
                        onChange={handleChange}
                        placeholder="List any other associations you belong to"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Do you have any criminal record?"
                        name="criminalRecord"
                        checked={formData.criminalRecord}
            onChange={handleChange}
          />
        </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
        <Form.Group className="mb-3">
                      <Form.Label>Reason for Joining *</Form.Label>
          <Form.Control
            as="textarea"
                        rows={3}
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        placeholder="Why do you want to join the EDO Cultural Association?"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Passport Photo *</Form.Label>
                      <Form.Control
                        type="file"
                        name="passportPhoto"
                        onChange={handleChange}
                        accept="image/*"
                        required
                      />
                      <Form.Text className="text-muted">
                        Please upload a recent passport photograph
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="agreement-checkbox"
                        label={
                          <span className="ms-1">
                            I agree to the terms and conditions of the EDO Cultural Association *
                          </span>
                        }
                        name="agreement"
                        checked={formData.agreement}
            onChange={handleChange}
                        required
                        className="user-select-none"
          />
        </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-center">
              <Button variant="primary" type="submit" className="px-4 py-2">
          Submit Application
        </Button>
            </div>
      </Form>
        </Card.Body>
      </Card>
      <style jsx>{`
        .smaller-form .form-group {
          margin-bottom: 0.75rem !important;
        }
        .smaller-form .form-control {
          padding: 0.375rem 0.75rem;
          font-size: 0.9rem;
        }
        .smaller-form .form-label {
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
        }
        .user-select-none {
          user-select: none;
          cursor: pointer;
        }
        .user-select-none label {
          cursor: pointer;
        }
      `}</style>
    </Container>
  );
};

export default Membership; 