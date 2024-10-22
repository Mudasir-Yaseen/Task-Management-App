import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth(); // Assuming you are using a hook to get user info

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Empty space on the left */}
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="flex items-center p-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span className="ml-2">Dashboard</span>
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center p-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Profile</span>
          </Link>
          {user && (
            <button 
              onClick={handleLogout} 
              className="flex items-center p-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-500 hover:text-white"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="ml-2">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
