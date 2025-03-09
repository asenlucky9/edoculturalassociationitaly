import React, { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext();

// Helper function to convert File to Data URL
const fileToDataURL = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

// Helper function to convert Data URL back to File
const dataURLtoFile = (dataurl, filename) => {
  try {
    if (!dataurl || typeof dataurl !== 'string') return null;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error('Error converting data URL to file:', error);
    return null;
  }
};

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    try {
      const savedMembers = localStorage.getItem('members');
      if (savedMembers) {
        const parsedMembers = JSON.parse(savedMembers);
        return parsedMembers.map(member => ({
          ...member,
          passportPhoto: member.passportPhoto ? 
            dataURLtoFile(member.passportPhoto, 'passport-photo.jpg') : 
            null
        }));
      }
    } catch (error) {
      console.error('Error loading members from localStorage:', error);
    }
    return [];
  });

  useEffect(() => {
    const saveMembersToStorage = async () => {
      try {
        const membersToStore = await Promise.all(
          members.map(async (member) => ({
            ...member,
            passportPhoto: member.passportPhoto ? 
              await fileToDataURL(member.passportPhoto) : 
              null
          }))
        );
        localStorage.setItem('members', JSON.stringify(membersToStore));
      } catch (error) {
        console.error('Error saving members to localStorage:', error);
      }
    };

    saveMembersToStorage();
  }, [members]);

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now(),
      applicationDate: new Date().toISOString(),
      status: 'pending'
    };
    setMembers(prevMembers => [...prevMembers, newMember]);
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