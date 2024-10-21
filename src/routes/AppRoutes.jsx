// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Notifications from '../components/Notifications';
import ErrorPage from '../pages/ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import Login from '../components/Auth/Login'; // Ensure the path is correct
import SignUp from '../components/Auth/SignUp'; // Make sure to import the SignUp component

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} /> {/* Login Page */}
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}
            
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <UserDashboard />
                    </ProtectedRoute>
                }
            /> {/* User Dashboard */}
            
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            /> {/* Admin Dashboard */}
            
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            /> {/* Profile Page */}
            
            <Route path="/notifications" element={<Notifications />} /> {/* Notifications Page */}
            
            <Route path="*" element={<ErrorPage />} /> {/* Error Page for undefined routes */}
        </Routes>
    );
};

export default AppRoutes;
