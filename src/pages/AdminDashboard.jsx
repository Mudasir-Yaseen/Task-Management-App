import React from "react";
import TaskList from "../components/Dashboard/TaskList";
import Notifications from "../components/Notifications";
import Sidebar from "../components/Sidebar";
import Navbar from "../Components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 bg-white shadow-xl rounded-tl-3xl overflow-auto">
          
          {/* Dashboard Heading */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage tasks and monitor notifications for users.</p>
          </header>
          
          {/* Admin Panel Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Example of Admin Stats Panel */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Total Tasks</h2>
              <p className="text-4xl font-semibold">128</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Pending Approvals</h2>
              <p className="text-4xl font-semibold">14</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">User Registrations</h2>
              <p className="text-4xl font-semibold">35</p>
            </div>
          </section>

          {/* Task List Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">Tasks Overview</h2>
              <button className="px-5 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-500 hover:scale-105 transition-transform duration-200">
                + Add Task
              </button>
            </div>
            <TaskList />
          </section>

          {/* Notifications Section */}
          <section className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Recent Notifications</h2>
            <Notifications />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
