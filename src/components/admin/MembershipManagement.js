import React, { useState } from 'react';
import { Container, Form, Button, Badge, Tabs, Tab, Card, ButtonGroup } from 'react-bootstrap';
import { useMemberContext } from '../../context/MemberContext';

const MembershipManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const { members, updateMemberStatus, deleteMember } = useMemberContext();

  const getApplicationsByStatus = (status) => {
    return members.filter(member => member.status === status);
  };

  const filteredApplications = (status) => {
    return getApplicationsByStatus(status).filter(app => {
      const searchLower = searchQuery.toLowerCase();
      if (searchBy === 'name') {
        return (
          app.name?.toLowerCase().includes(searchLower) ||
          app.surname?.toLowerCase().includes(searchLower)
        );
      } else if (searchBy === 'phone') {
        return app.phone?.includes(searchQuery);
      }
      return true;
    });
  };

  const handleStatusChange = (id, newStatus) => {
    updateMemberStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      deleteMember(id);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const renderMemberList = (status) => {
    const applications = filteredApplications(status);
    
    return (
      <div className="member-list-section">
        <div className="search-section mb-4 p-3 bg-light rounded">
          <h4 className="mb-3">Search Members</h4>
          <div className="d-flex gap-3 align-items-center">
            <Form.Group className="flex-grow-1">
              <Form.Control
                type="search"
                placeholder={searchBy === 'name' ? "Search by name..." : "Search by phone number..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="search-select"
              >
                <option value="name">Search by Name</option>
                <option value="phone">Search by Phone</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="members-grid">
          {applications.map((member) => (
            <Card key={member.id} className="member-card">
              <Card.Body>
                <div className="d-flex gap-3">
                  <div className="member-photo-container">
                    {member.passportPhoto ? (
                      <img
                        src={URL.createObjectURL(member.passportPhoto)}
                        alt={`${member.surname} ${member.name}`}
                        className="member-photo"
                      />
                    ) : (
                      <div className="member-photo-placeholder">
                        <i className="fas fa-user"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="member-name">{member.surname} {member.name}</h5>
                        <p className="member-info mb-1">
                          <i className="fas fa-phone me-2"></i>
                          {member.phone}
                        </p>
                        <p className="member-info mb-1">
                          <i className="fas fa-envelope me-2"></i>
                          {member.email}
                        </p>
                        <p className="member-info mb-1">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {member.homeAddress}
                        </p>
                        <p className="member-info">
                          <i className="fas fa-calendar me-2"></i>
                          DOB: {member.dob}
                        </p>
                      </div>
                      {getStatusBadge(member.status)}
                    </div>
                  </div>
                </div>
                
                <div className="member-actions mt-3 pt-3 border-top">
                  <ButtonGroup className="me-2">
                    {status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleStatusChange(member.id, 'approved')}
                        >
                          <i className="fas fa-check me-1"></i> Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleStatusChange(member.id, 'rejected')}
                        >
                          <i className="fas fa-times me-1"></i> Reject
                        </Button>
                      </>
                    )}
                    {status === 'rejected' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleStatusChange(member.id, 'approved')}
                      >
                        <i className="fas fa-check me-1"></i> Approve
                      </Button>
                    )}
                    {status === 'approved' && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleStatusChange(member.id, 'pending')}
                      >
                        <i className="fas fa-clock me-1"></i> Set Pending
                      </Button>
                    )}
                  </ButtonGroup>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      const details = {
                        ...member,
                        fullName: `${member.surname} ${member.name}`,
                        status: status
                      };
                      alert(JSON.stringify(details, null, 2));
                    }}
                  >
                    <i className="fas fa-eye me-1"></i> View Details
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <i className="fas fa-trash-alt me-1"></i> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No {status} members found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div className="admin-section">
        <h2 className="admin-section-title">
          <i className="fas fa-users"></i>
          Membership Management
        </h2>
        
        <div className="applications-grid mb-4">
          <div className="application-stat-card pending">
            <div className="application-count status-pending">
              {getApplicationsByStatus('pending').length}
            </div>
            <div className="application-label">Pending Applications</div>
          </div>
          
          <div className="application-stat-card approved">
            <div className="application-count status-approved">
              {getApplicationsByStatus('approved').length}
            </div>
            <div className="application-label">Approved Members</div>
          </div>
          
          <div className="application-stat-card rejected">
            <div className="application-count status-rejected">
              {getApplicationsByStatus('rejected').length}
            </div>
            <div className="application-label">Rejected Applications</div>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 membership-tabs"
          fill
        >
          <Tab 
            eventKey="pending" 
            title={
              <div className="d-flex align-items-center">
                <span className="status-pending me-2">●</span>
                Pending Applications
                <Badge bg="warning" className="ms-2">
                  {getApplicationsByStatus('pending').length}
                </Badge>
              </div>
            }
          >
            {renderMemberList('pending')}
          </Tab>
          <Tab 
            eventKey="approved" 
            title={
              <div className="d-flex align-items-center">
                <span className="status-approved me-2">●</span>
                Approved Members
                <Badge bg="success" className="ms-2">
                  {getApplicationsByStatus('approved').length}
                </Badge>
              </div>
            }
          >
            {renderMemberList('approved')}
          </Tab>
          <Tab 
            eventKey="rejected" 
            title={
              <div className="d-flex align-items-center">
                <span className="status-rejected me-2">●</span>
                Rejected Applications
                <Badge bg="danger" className="ms-2">
                  {getApplicationsByStatus('rejected').length}
                </Badge>
              </div>
            }
          >
            {renderMemberList('rejected')}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default MembershipManagement; 