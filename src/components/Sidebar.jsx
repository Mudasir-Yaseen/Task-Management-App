import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ClipboardListIcon, UserIcon, UsersIcon } from '@heroicons/react/outline'; // Import Heroicons
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
          {user && user.role !== "admin" && (
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                  }`
                }
              >
                <HomeIcon className="w-5 h-5" /> {/* Add Home icon */}
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
          )}

          {/* Admin Section */}
          {user && user.role === "admin" && (
            <>
              <li className="mb-2">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                    }`
                  }
                >
                  <UserIcon className="w-5 h-5" /> {/* Add Admin Panel icon */}
                  <span className="ml-3">Admin Panel</span>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/manage-users"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-lg transition duration-200 ease-in-out ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                    }`
                  }
                >
                  <UsersIcon className="w-5 h-5" /> {/* Add Manage Users icon */}
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
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-300 hover:bg-teal-500 hover:text-white'
                }`
              }
            >
              <ClipboardListIcon className="w-5 h-5" /> {/* Add Projects icon */}
              <span className="ml-3">Projects</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
