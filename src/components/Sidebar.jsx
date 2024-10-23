import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth(); // Assuming 'user' contains the role information

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white shadow-lg transition-all duration-300">
      <div className="flex items-center justify-center h-16 border-gray-700">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                  isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                }`
              }
            >
              <span className="material-icons">dashboard</span>
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                  isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                }`
              }
            >
              <span className="material-icons">person</span>
              <span className="ml-3">Profile</span>
            </NavLink>
          </li>

          {/* Admin Section */}
          {user && user.isAdmin && ( // Check if the user is an admin
            <>
              <li className="mb-2">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                    }`
                  }
                >
                  <span className="material-icons">admin_panel_settings</span>
                  <span className="ml-3">Admin Panel</span>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/manage-users" // Link to Manage Users
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                    }`
                  }
                >
                  <span className="material-icons">group</span> {/* Group icon for manage users */}
                  <span className="ml-3">Manage Users</span>
                </NavLink>
              </li>
            </>
          )}

          <li className="mb-2">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                  isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                }`
              }
            >
              <span className="material-icons">folder</span> {/* Folder icon for projects */}
              <span className="ml-3">Projects</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
