import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Badge, Tabs, Tab, Form } from 'react-bootstrap';
import { useMemberContext } from '../../context/MemberContext';

const MembershipManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const { members, updateMemberStatus, deleteMember } = useMemberContext();

  const getApplicationsByStatus = (status) => {
    return members.filter(member => member.status === status);
  };

  const filteredApplications = (status) => {
    return getApplicationsByStatus(status).filter(app => {
      const searchLower = searchQuery.toLowerCase();
      return (
        app.name?.toLowerCase().includes(searchLower) ||
        app.surname?.toLowerCase().includes(searchLower) ||
        app.email?.toLowerCase().includes(searchLower)
      );
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

  const renderApplicationsTable = (status) => {
    const applications = filteredApplications(status);
    
    return (
      <div className="admin-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="management-title mb-0">
            {status.charAt(0).toUpperCase() + status.slice(1)} Applications
          </h3>
          <Form.Control
            type="search"
            placeholder="Search applications..."
            className="w-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Application Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.surname} {app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.dob}</td>
                <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
                <td>
                  {status === 'pending' ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => updateMemberStatus(app.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateMemberStatus(app.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Badge bg={status === 'approved' ? 'success' : 'danger'}>
                      {status}
                    </Badge>
                  )}
                  <Button
                    variant="info"
                    size="sm"
                    className="ms-2"
                    onClick={() => window.alert(JSON.stringify(app, null, 2))}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {applications.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No {status} applications found</p>
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
          <div className="application-stat-card">
            <div className="application-count status-pending">
              {getApplicationsByStatus('pending').length}
            </div>
            <div className="application-label">Pending Applications</div>
          </div>
          
          <div className="application-stat-card">
            <div className="application-count status-approved">
              {getApplicationsByStatus('approved').length}
            </div>
            <div className="application-label">Approved Members</div>
          </div>
          
          <div className="application-stat-card">
            <div className="application-count status-rejected">
              {getApplicationsByStatus('rejected').length}
            </div>
            <div className="application-label">Rejected Applications</div>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="pending" title="Pending Applications">
            {renderApplicationsTable('pending')}
          </Tab>
          <Tab eventKey="approved" title="Approved Members">
            {renderApplicationsTable('approved')}
          </Tab>
          <Tab eventKey="rejected" title="Rejected Applications">
            {renderApplicationsTable('rejected')}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default MembershipManagement; 