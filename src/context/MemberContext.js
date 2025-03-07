import React, { createContext, useState, useContext, useEffect } from 'react';

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [memberCount, setMemberCount] = useState(0);
  const [applications, setApplications] = useState([]);

  // Load member count and applications from localStorage on initial render
  useEffect(() => {
    const count = localStorage.getItem('memberCount');
    const savedApplications = localStorage.getItem('memberApplications');
    
    if (count) {
      setMemberCount(parseInt(count));
    }
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Update member count
  const updateMemberCount = (count) => {
    setMemberCount(count);
    localStorage.setItem('memberCount', count.toString());
  };

  // Add new application
  const addApplication = (application) => {
    const newApplication = {
      ...application,
      id: Date.now(),
      status: 'pending',
      applicationDate: new Date().toISOString()
    };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('memberApplications', JSON.stringify(updatedApplications));
    return newApplication.id;
  };

  // Approve application
  const approveApplication = (applicationId) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'approved', approvalDate: new Date().toISOString() };
      }
      return app;
    });
    setApplications(updatedApplications);
    localStorage.setItem('memberApplications', JSON.stringify(updatedApplications));
    updateMemberCount(memberCount + 1);
  };

  // Reject application
  const rejectApplication = (applicationId) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: 'rejected', rejectionDate: new Date().toISOString() };
      }
      return app;
    });
    setApplications(updatedApplications);
    localStorage.setItem('memberApplications', JSON.stringify(updatedApplications));
  };

  // Get applications by status
  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status);
  };

  return (
    <MemberContext.Provider value={{ 
      memberCount, 
      applications,
      addApplication,
      approveApplication,
      rejectApplication,
      getApplicationsByStatus
    }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMemberCount = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberCount must be used within a MemberProvider');
  }
  return context;
}; 