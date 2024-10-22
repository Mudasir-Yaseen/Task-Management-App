// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Notifications from '../components/Notifications';
import ErrorPage from '../pages/ErrorPage';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/Signup';
import ProtectedRoute from '../routes/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';
// Make sure to import the SignUp component

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} /> {/* Login Page */}
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}
            <Route path="/admin" element={<AdminDashboard />} /> {/* Sign Up Page */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <UserDashboard />
                    </ProtectedRoute>
                }
            /> {/* User Dashboard */}
            
            {/* <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        < />
                    </ProtectedRoute>
                }
            /> Admin Dashboard */}
            
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
