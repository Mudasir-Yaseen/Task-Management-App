import React from "react";
import TaskList from "../components/Dashboard/TaskList";
import Notifications from "../components/Notifications";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto">
          <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
          <TaskList />
          <Notifications />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
