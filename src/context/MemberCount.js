import React, { createContext, useContext, useState, useEffect } from 'react';

const MemberCountContext = createContext();

export const useMemberCount = () => {
  const context = useContext(MemberCountContext);
  if (!context) {
    throw new Error('useMemberCount must be used within a MemberCountProvider');
  }
  return context;
};

export const MemberCountProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    // Load applications from localStorage on component mount
    const storedApplications = JSON.parse(localStorage.getItem('membershipApplications') || '[]');
    setApplications(storedApplications);
    
    // Calculate member count (approved applications)
    const approvedCount = storedApplications.filter(app => app.status === 'approved').length;
    setMemberCount(approvedCount);
  }, []);

  const approveApplication = (applicationId) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'approved' };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    localStorage.setItem('membershipApplications', JSON.stringify(updatedApplications));
    
    // Update member count
    const newCount = updatedApplications.filter(app => app.status === 'approved').length;
    setMemberCount(newCount);
  };

  const rejectApplication = (applicationId) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'rejected' };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    localStorage.setItem('membershipApplications', JSON.stringify(updatedApplications));
    
    // Update member count
    const newCount = updatedApplications.filter(app => app.status === 'approved').length;
    setMemberCount(newCount);
  };

  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status);
  };

  const value = {
    applications,
    memberCount,
    approveApplication,
    rejectApplication,
    getApplicationsByStatus
  };

  return (
    <MemberCountContext.Provider value={value}>
      {children}
    </MemberCountContext.Provider>
  );
};

export default MemberCountContext; 