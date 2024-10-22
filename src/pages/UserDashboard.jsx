// UserDashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../Components/Navbar";
import KanbanBoard from "../components/KanBanBoard";
 // Import the KanbanBoard

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100"> {/* Light background for contrast */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 overflow-auto bg-white text-gray-800"> {/* Lighter main content area */}
          <h1 className="text-3xl font-semibold mb-6 text-teal-600">User Dashboard</h1> {/* Teal accent for title */}
          
          {/* Kanban Board Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"> {/* Card style with shadow */}
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tasks</h2>
            <KanbanBoard />
          </div>

          
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
