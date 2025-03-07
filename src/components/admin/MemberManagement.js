import React, { useState } from 'react';
import './AdminPanel.css';

const MemberManagement = () => {
  const [members] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      joinDate: '2024-03-15',
      status: 'pending',
      membershipType: 'Full Member',
      address: '123 Main St, City',
      occupation: 'Software Engineer',
      dateOfBirth: '1990-05-15',
      nationality: 'Nigerian',
      stateOfOrigin: 'Edo State',
      identification: {
        type: 'Passport',
        number: 'A1234567'
      },
      nextOfKin: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1987654321',
        address: '123 Main St, City'
      },
      documents: {
        passport: 'passport-photo.jpg',
        idCard: 'id-card.jpg'
      }
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '+1234567891',
      joinDate: '2024-03-10',
      status: 'active',
      membershipType: 'Associate Member',
      address: '456 Oak St, City',
      occupation: 'Teacher',
      dateOfBirth: '1988-08-20',
      nationality: 'Italian',
      stateOfOrigin: 'Edo State',
      identification: {
        type: 'National ID',
        number: 'B9876543'
      },
      nextOfKin: {
        name: 'Bob Smith',
        relationship: 'Brother',
        phone: '+1987654322',
        address: '456 Oak St, City'
      },
      documents: {
        passport: 'passport-photo-2.jpg',
        idCard: 'id-card-2.jpg'
      }
    }
  ]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleStatusChange = (memberId, newStatus) => {
    // In a real application, this would make an API call
    console.log(`Changing status for member ${memberId} to ${newStatus}`);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Member Management</h2>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search members..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add Member
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Membership Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.joinDate}</td>
                <td>
                  <span className={`status-badge ${member.status}`}>
                    {member.status}
                  </span>
                </td>
                <td>{member.membershipType}</td>
                <td className="actions">
                  <button 
                    className="view-btn"
                    onClick={() => handleViewDetails(member)}
                  >
                    View Profile
                  </button>
                  {member.status === 'pending' && (
                    <>
                      <button 
                        className="approve-btn"
                        onClick={() => handleStatusChange(member.id, 'active')}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleStatusChange(member.id, 'rejected')}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedMember && (
        <div className="modal">
          <div className="modal-content modal-lg">
            <div className="modal-header">
              <h3>Member Profile</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="member-profile">
              <div className="profile-section">
                <h4>Personal Information</h4>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Full Name:</label>
                    <span>{selectedMember.name}</span>
                  </div>
                  <div className="profile-item">
                    <label>Email:</label>
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="profile-item">
                    <label>Phone:</label>
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="profile-item">
                    <label>Date of Birth:</label>
                    <span>{selectedMember.dateOfBirth}</span>
                  </div>
                  <div className="profile-item">
                    <label>Nationality:</label>
                    <span>{selectedMember.nationality}</span>
                  </div>
                  <div className="profile-item">
                    <label>State of Origin:</label>
                    <span>{selectedMember.stateOfOrigin}</span>
                  </div>
                  <div className="profile-item">
                    <label>Address:</label>
                    <span>{selectedMember.address}</span>
                  </div>
                  <div className="profile-item">
                    <label>Occupation:</label>
                    <span>{selectedMember.occupation}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4>Membership Information</h4>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Member Since:</label>
                    <span>{selectedMember.joinDate}</span>
                  </div>
                  <div className="profile-item">
                    <label>Membership Type:</label>
                    <span>{selectedMember.membershipType}</span>
                  </div>
                  <div className="profile-item">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedMember.status}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4>Identification</h4>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>ID Type:</label>
                    <span>{selectedMember.identification.type}</span>
                  </div>
                  <div className="profile-item">
                    <label>ID Number:</label>
                    <span>{selectedMember.identification.number}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4>Next of Kin</h4>
                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Name:</label>
                    <span>{selectedMember.nextOfKin.name}</span>
                  </div>
                  <div className="profile-item">
                    <label>Relationship:</label>
                    <span>{selectedMember.nextOfKin.relationship}</span>
                  </div>
                  <div className="profile-item">
                    <label>Phone:</label>
                    <span>{selectedMember.nextOfKin.phone}</span>
                  </div>
                  <div className="profile-item">
                    <label>Address:</label>
                    <span>{selectedMember.nextOfKin.address}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4>Documents</h4>
                <div className="documents-grid">
                  <div className="document-item">
                    <label>Passport Photo:</label>
                    <img 
                      src={`/images/members/${selectedMember.documents.passport}`} 
                      alt="Passport" 
                      className="document-image"
                    />
                  </div>
                  <div className="document-item">
                    <label>ID Card:</label>
                    <img 
                      src={`/images/members/${selectedMember.documents.idCard}`} 
                      alt="ID Card" 
                      className="document-image"
                    />
                  </div>
                </div>
              </div>

              {selectedMember.status === 'pending' && (
                <div className="profile-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => handleStatusChange(selectedMember.id, 'active')}
                  >
                    Approve Membership
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleStatusChange(selectedMember.id, 'rejected')}
                  >
                    Reject Membership
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement; 