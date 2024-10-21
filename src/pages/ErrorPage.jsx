// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Import the useAuth hook to get the user's role

const ErrorPage = () => {
  const { user } = useAuth(); // Assuming the user object contains the role information

  // Determine the home route based on the user's role
  const homeRoute = user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to={homeRoute}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
