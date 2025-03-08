import React, { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('members');
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const addMember = (member) => {
    setMembers(prevMembers => [...prevMembers, { ...member, id: Date.now() }]);
  };

  const updateMemberStatus = (id, newStatus) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
  };

  const deleteMember = (id) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  const memberCount = members.filter(member => member.status === 'approved').length;

  return (
    <MemberContext.Provider value={{
      members,
      addMember,
      updateMemberStatus,
      deleteMember,
      memberCount
    }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};

export const useMemberCount = () => {
  const { memberCount } = useMemberContext();
  return { memberCount };
};

export default MemberContext; 