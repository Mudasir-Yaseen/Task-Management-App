import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          Task Management App
        </div>
        <div className="flex items-center space-x-8">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>
          {user && (
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
