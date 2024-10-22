import React from "react";
import Notifications from "../components/Notifications";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/Dashboard/TaskList";
import Navbar from "../Components/Navbar";

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100"> {/* Light background for contrast */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 overflow-auto bg-white text-gray-800"> {/* Lighter main content area */}
          <h1 className="text-3xl font-semibold mb-6 text-teal-600">User Dashboard</h1> {/* Teal accent for title */}
          
          {/* Task List Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"> {/* Card style with shadow */}
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tasks</h2>
            <TaskList />
          </div>

          {/* Notifications Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200"> {/* Another card for notifications */}
            <h2 className="text-xl font-bold text-gray-700 mb-4">Notifications</h2>
            <Notifications />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
