import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faSignOutAlt, faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

const notificationsData = [
  { id: 1, message: 'Your task "Design Mockup" is due tomorrow.', time: '2 hours ago' },
  { id: 2, message: 'You have a new comment on "Implement Login Page".', time: '1 day ago' },
  { id: 3, message: 'Task "Review PR" has been approved.', time: '3 days ago' },
  { id: 4, message: 'You were added to the task "Team Meeting".', time: '1 week ago' },
];

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user and logout function from auth hook
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleLogout = () => {
    console.log("Logging out..."); // Check if this is logged
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page after logout
  };
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex-grow"></div>
        
        {/* Notifications icon */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-500 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faBell} />
          </button>
          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 w-64 bg-gray-800 rounded-md shadow-lg mt-2 z-10 p-2">
              <h2 className="text-lg font-bold text-white mb-2">Notifications</h2>
              <ul className="space-y-2">
                {notificationsData.length === 0 ? (
                  <li className="text-gray-500">No notifications available.</li>
                ) : (
                  notificationsData.map((notification) => (
                    <li key={notification.id} className="bg-gray-700 p-2 rounded-md">
                      <p className="text-gray-300">{notification.message}</p>
                      <span className="text-gray-400 text-sm">{notification.time}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

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
                to="/dashboard" // Updated path to "/dashboard"
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
