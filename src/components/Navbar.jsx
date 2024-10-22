import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth(); // Assuming you are using a hook to get user info
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener to close the dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Empty space on the left */}
        <div className="flex-grow"></div>
        
        {/* Profile heading with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center p-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-500 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Profile</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
          </button>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 w-48 bg-gray-800 rounded-md shadow-lg mt-2 z-10">
              <Link 
                to="/" 
                className="block px-4 py-2 text-gray-300 hover:bg-teal-500 hover:text-white"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-gray-300 hover:bg-teal-500 hover:text-white"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              {user && (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }} 
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-teal-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
