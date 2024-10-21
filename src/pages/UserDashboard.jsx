import React from "react";
import Notifications from "../components/Notifications";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import TaskList from "../components/Dashboard/TaskList";

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto">
          <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
          <TaskList />
          <Notifications />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
