import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  // Check if user is authenticated and has the correct role
  const isAuthenticated = user !== null;
  const hasAccess = isAuthenticated && user.role === role;

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If the user doesn't have the right role, redirect to error page or a forbidden page
  if (!hasAccess) {
    return <Navigate to="/error" />; // Adjust this to your error page route
  }

  // If authenticated and has access, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
