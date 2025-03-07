import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);

    // Load saved user, events, and members on component mount
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
        const savedMembers = JSON.parse(localStorage.getItem("members")) || [];

        if (savedUser) {
            setUser(savedUser);
            setLoginSuccess(true);
        }
        setEvents(savedEvents);
        setMembers(savedMembers);
    }, []);

    // Save events and members to local storage when they change
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem("members", JSON.stringify(members));
    }, [members]);

    // Login function
    const login = (username, password, rememberMe) => {
        return new Promise((resolve, reject) => {
            if (!username || !password) {
                setError('Username and password are required.');
                reject(new Error('Username and password are required.'));
                return;
            }
            if (username === 'admin' && password === 'admin') {
                const loggedInUser = { name: 'Admin', role: 'admin' };
                setUser(loggedInUser);
                setError(null);
                setLoginSuccess(true);

                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                } else {
                    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
                }

                resolve();
            } else {
                setError('Invalid username or password');
                reject(new Error('Invalid credentials'));
            }
        });
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setError(null);
        setLoginSuccess(false);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    };

    // Function to add events
    const addEvent = (event) => {
        // Create a URL for the image if it exists
        const eventWithImageUrl = {
            ...event,
            picture: event.picture ? URL.createObjectURL(event.picture) : null,
        };
        setEvents((prevEvents) => [...prevEvents, eventWithImageUrl]);
    };

    // Function to remove events
    const removeEvent = (eventToRemove) => {
        // Clean up the URL object if it exists
        if (eventToRemove.picture) {
            URL.revokeObjectURL(eventToRemove.picture); // Prevent memory leaks
        }
        setEvents((prevEvents) => prevEvents.filter(event => event !== eventToRemove));
    };

    // Function to add members
    const addMember = (member) => {
        setMembers((prevMembers) => [...prevMembers, member]);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            error, 
            loginSuccess, 
            events, 
            addEvent, 
            removeEvent, 
            members, 
            addMember 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Sample Login Form Component
const LoginForm = () => {
    const { login, error } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password, rememberMe)
            .then(() => {
                // Handle successful login (redirect, etc.)
                console.log('Login successful!');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />
                {error && <p className="error-message">{error}</p>}
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                /> Remember Me
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
