// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";
import Notifications from "../components/Notifications";
import ErrorPage from "../pages/ErrorPage";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import Projects from "../pages/Projects";
import MainLayout from "../components/MainLayout";
import ManageUsers from "../pages/ManageUsers";
import ProtectedRoute from "../../src/routes/ProtectedRoute"; // Import ProtectedRoute

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Main Layout for protected routes */}
            <Route path="/" element={<MainLayout />}>
                {/* Protected Routes */}
                <Route >
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/manage-users" element={<ManageUsers />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/projects" element={<Projects />} />
                </Route>
            </Route>

            <Route path="/notifications" element={<Notifications />} />
            {/* Error Page for undefined routes */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
