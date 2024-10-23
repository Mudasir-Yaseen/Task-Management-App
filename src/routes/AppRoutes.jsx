import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";
import Notifications from "../components/Notifications";
import ErrorPage from "../pages/ErrorPage";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import Projects from "../pages/Projects";
import MainLayout from "../components/MainLayout";
import ManageUsers from "../pages/ManageUsers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} /> {/* Login Page */}
      <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}

      {/* Main Layout for protected routes */}
      <Route path="/" element={<MainLayout />}>
        {/* Protected Routes */}
        <Route path="/dashboard" element={<UserDashboard />} /> {/* User Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}

        {/* Manage Users (Admin Only) */}
        <Route path="/manage-users" element={<ManageUsers />} /> {/* Manage Users Page */}

        <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
        <Route path="/projects" element={<Projects />} /> {/* Projects Page */}
      </Route>
      
      <Route path="/notifications" element={<Notifications />} /> {/* Notifications Page */}

      {/* Error Page for undefined routes */}
      <Route path="*" element={<ErrorPage />} /> 
    </Routes>
  );
};

export default AppRoutes;
