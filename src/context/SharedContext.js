import React, { createContext, useContext, useState, useEffect } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [gallery, setGallery] = useState(() => {
    const savedGallery = localStorage.getItem('gallery');
    return savedGallery ? JSON.parse(savedGallery) : [];
  });

  const [partnerships, setPartnerships] = useState(() => {
    const savedPartnerships = localStorage.getItem('partnerships');
    return savedPartnerships ? JSON.parse(savedPartnerships) : [];
  });

  const [meetings, setMeetings] = useState(() => {
    const savedMeetings = localStorage.getItem('meetings');
    return savedMeetings ? JSON.parse(savedMeetings) : [];
  });

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Save gallery to localStorage
  useEffect(() => {
    localStorage.setItem('gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Save partnerships to localStorage
  useEffect(() => {
    localStorage.setItem('partnerships', JSON.stringify(partnerships));
  }, [partnerships]);

  // Save meetings to localStorage
  useEffect(() => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }, [meetings]);

  // Events functions
  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, { ...event, id: Date.now() }]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => event.id === id ? { ...updatedEvent, id } : event)
    );
  };

  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  // Gallery functions
  const addGalleryItem = (item) => {
    setGallery(prevGallery => [...prevGallery, { ...item, id: Date.now() }]);
  };

  const updateGalleryItem = (id, updatedItem) => {
    setGallery(prevGallery => 
      prevGallery.map(item => item.id === id ? { ...updatedItem, id } : item)
    );
  };

  const deleteGalleryItem = (id) => {
    setGallery(prevGallery => prevGallery.filter(item => item.id !== id));
  };

  // Partnership functions
  const addPartnership = (newPartnership) => {
    const partnership = {
      ...newPartnership,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setPartnerships(prev => [...prev, partnership]);
  };

  const updatePartnership = (id, updates) => {
    setPartnerships(prev => 
      prev.map(partnership => 
        partnership.id === id 
          ? { ...partnership, ...updates }
          : partnership
      )
    );
  };

  const deletePartnership = (id) => {
    setPartnerships(prev => prev.filter(partnership => partnership.id !== id));
  };

  // Meetings functions
  const addMeeting = (meeting) => {
    setMeetings(prevMeetings => [...prevMeetings, { ...meeting, id: Date.now() }]);
  };

  const updateMeeting = (id, updatedMeeting) => {
    setMeetings(prevMeetings => 
      prevMeetings.map(meeting => 
        meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting
      )
    );
  };

  const deleteMeeting = (id) => {
    setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== id));
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    partnerships,
    addPartnership,
    updatePartnership,
    deletePartnership,
    meetings,
    addMeeting,
    updateMeeting,
    deleteMeeting
  };

  return (
    <SharedContext.Provider value={value}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error('useShared must be used within a SharedProvider');
  }
  return context;
};

export default SharedContext; 