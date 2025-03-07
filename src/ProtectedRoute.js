// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, redirectPath = '/admin' }) => {
    const { user, isLoading } = useAuth(); // Assuming isLoading is part of your Auth context
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set loading to false after user authentication is resolved
        if (user || !isLoading) {
            setLoading(false);
        }
    }, [user, isLoading]);

    // While checking the user status, show a loading indicator
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
    }

    // If the user is not logged in, redirect to the specified path
    if (!user) {
        return <Navigate to={redirectPath} />;
    }

    return children; // Render the protected route's children if authenticated
};

export default ProtectedRoute;
