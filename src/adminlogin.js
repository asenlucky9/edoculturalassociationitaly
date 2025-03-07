import React, { useState } from 'react'; 
import { useAuth } from './AuthProvider';
import './styles.css'; // Ensure to import your CSS file

const AdminLogin = () => {
    const { user, login, events, addEvent, removeEvent, updateEvent } = useAuth();
    const [newEvent, setNewEvent] = useState({
        name: '',
        address: '',
        picture: '',
        location: '',
        signedBy: '',
        date: '',
        venue: ''
    });

    const [editingEvent, setEditingEvent] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // For success messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password, rememberMe);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEvent) {
            updateEvent(editingEvent, newEvent);
            setSuccess('Event updated successfully!'); // Success message
            setEditingEvent(null);
        } else {
            addEvent({
                ...newEvent,
                picture: newEvent.picture ? URL.createObjectURL(newEvent.picture) : ''
            });
            setSuccess('Event added successfully!'); // Success message
        }
        setNewEvent({ name: '', address: '', picture: '', location: '', signedBy: '', date: '', venue: '' });
    };

    const handleRemove = (eventToRemove) => {
        removeEvent(eventToRemove);
        setSuccess('Event removed successfully!'); // Success message
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setNewEvent(event);
    };

    const handlePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewEvent({ ...newEvent, picture: e.target.files[0] });
        }
    };

    const picturePreview = newEvent.picture ? URL.createObjectURL(newEvent.picture) : '';

    return (
        <div>
            {!user ? (
                <div>
                    <h2>Admin Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin} className="login-form">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            className="input-field" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <label>
                            <input 
                                type="checkbox" 
                                checked={rememberMe} 
                                onChange={(e) => setRememberMe(e.target.checked)} 
                            />
                            Remember Me
                        </label>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            ) : (
                <>
                    <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSubmit} className="event-form">
                        <input 
                            type="text" 
                            name="name" 
                            className="input-field" 
                            placeholder="Event Name" 
                            value={newEvent.name} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address" 
                            className="input-field" 
                            placeholder="Event Address" 
                            value={newEvent.address} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="file" 
                            name="picture" 
                            accept="image/*"
                            onChange={handlePictureChange} 
                        />
                        {picturePreview && <img src={picturePreview} alt="Event Preview" style={{ width: '100px', height: 'auto' }} />}
                        <input 
                            type="text" 
                            name="location" 
                            className="input-field" 
                            placeholder="Location" 
                            value={newEvent.location} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="signedBy" 
                            className="input-field" 
                            placeholder="Signed By Chairman" 
                            value={newEvent.signedBy} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="date" 
                            name="date" 
                            className="input-field" 
                            value={newEvent.date} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="venue" 
                            className="input-field" 
                            placeholder="Venue" 
                            value={newEvent.venue} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <button type="submit" className="login-button">{editingEvent ? 'Update Event' : 'Add Event'}</button>
                    </form>

                    <h3>Event List</h3>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <h4>{event.name}</h4>
                                <p>Address: {event.address}</p>
                                <p>Location: {event.location}</p>
                                <p>Date: {event.date}</p>
                                <p>Signed By: {event.signedBy}</p>
                                {event.picture && <img src={event.picture} alt={event.name} style={{ width: '100px', height: 'auto' }} />}
                                <button onClick={() => handleEdit(event)} className="edit-button">Edit Event</button>
                                <button onClick={() => handleRemove(event)} className="remove-button">Remove Event</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AdminLogin;
