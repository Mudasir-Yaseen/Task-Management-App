import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600"
            onClick={() => handleNavigate('/projects')}
          >
            <h2 className="text-xl font-bold">Project Management</h2>
            <p>Manage your projects effectively.</p>
          </div>
          <div
            className="bg-yellow-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-yellow-600"
            onClick={() => handleNavigate('/manage-users')}
          >
            <h2 className="text-xl font-bold">User Management</h2>
            <p>Manage users and their permissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
