// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Assuming user is defined in your auth context

    if (!user) {
        // If no user is authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    return children; // If authenticated, render the child components
};

export default ProtectedRoute;
