import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth(); // Assuming 'user' contains the role information

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white shadow-lg transition-all duration-300">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-3 rounded transition duration-200 ease-in-out ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="material-icons">dashboard</span>
              <span className="ml-2">Dashboard</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center p-3 rounded transition duration-200 ease-in-out ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="material-icons">person</span>
              <span className="ml-2">Profile</span>
            </NavLink>
          </li>
          {user && user.isAdmin && ( // Check if the user is an admin
            <li className="mb-2">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded transition duration-200 ease-in-out ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="material-icons">admin_panel_settings</span>
                <span className="ml-2">Admin Panel</span>
              </NavLink>
            </li>
          )}
          <li className="mb-2">
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center p-3 rounded transition duration-200 ease-in-out ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="material-icons">notifications</span>
              <span className="ml-2">Notifications</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `flex items-center p-3 rounded transition duration-200 ease-in-out ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="material-icons">logout</span>
              <span className="ml-2">Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
