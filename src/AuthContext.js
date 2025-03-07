import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user state
    const [error, setError] = useState(null); // Holds error state
    const [loginSuccess, setLoginSuccess] = useState(false); // Holds login success state
    const [events, setEvents] = useState([]); // Holds the events state

    // Check if there is saved login info on component mount
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
            setLoginSuccess(true);
        }
    }, []);

    // Login function
    const login = (username, password, rememberMe) => {
        return new Promise((resolve, reject) => {
            // Example login logic
            if (username === 'admin' && password === '') {
                const loggedInUser = { name: 'Admin', role: 'admin' };
                setUser(loggedInUser);
                setError(null); // Clear any previous errors
                setLoginSuccess(true); // Set login success

                // Save login info if "Remember Me" is checked
                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                }

                resolve(); // Login successful
            } else {
                setError('Invalid username or password'); // Set error message
                reject(new Error('Invalid credentials')); // Reject the promise
            }
        });
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setError(null); // Clear error on logout
        setLoginSuccess(false); // Reset login success on logout
        localStorage.removeItem("user"); // Remove saved login info
    };

    // Function to add events
    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]); // Add event to the events array
    };

    // Function to remove events by id
    const removeEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId)); // Remove event by id
    };

    // Provide the context value
    return (
        <AuthContext.Provider value={{ user, login, logout, error, loginSuccess, events, addEvent, removeEvent }}>
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
