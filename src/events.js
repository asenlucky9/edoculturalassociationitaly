import React, { useState, useEffect } from 'react'; 
import { useAuth } from './AuthProvider'; // Ensure the path to AuthProvider is correct

const Events = () => {
    const { user, logout, events, addEvent } = useAuth();
    const [newEvent, setNewEvent] = useState({ title: '', address: '', date: '', image: null });
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Effect to revoke the object URL when the component unmounts or when the image changes
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage); // Clean up object URL
            }
        };
    }, [previewImage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
        setError(null); // Clear error if input changes
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file)); // Show preview of uploaded image
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newEvent.title || !newEvent.address || !newEvent.date || !newEvent.image) {
            setError('All fields are required.');
            return;
        }

        // Add the event to context
        addEvent(newEvent);
        setNewEvent({ title: '', address: '', date: '', image: null });
        setPreviewImage(null); // Clear preview
        setError(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h2>Upcoming Events</h2>
            {user && user.role === 'admin' && (
                <>
                    <button onClick={handleLogout} style={{ marginBottom: '10px' }}>
                        Logout
                    </button>
                    <h3>Add New Event</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Event Title" 
                            value={newEvent.title} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Event Address" 
                            value={newEvent.address} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="date" 
                            name="date" 
                            value={newEvent.date} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            required 
                        />
                        {previewImage && (
                            <img src={previewImage} alt="Event preview" style={{ width: '100px', height: 'auto' }} />
                        )}
                        <button type="submit">Add Event</button>
                    </form>
                </>
            )}
            <h3>Event List</h3>
            <ul>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <li key={index}>
                            <h4>{event.title}</h4>
                            <p>{event.address}</p>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            {event.image && (
                                <img 
                                    src={URL.createObjectURL(event.image)} 
                                    alt={event.title} 
                                    style={{ width: '100px', height: 'auto' }} 
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No upcoming events found.</p>
                )}
            </ul>
        </div>
    );
};

export default Events;
