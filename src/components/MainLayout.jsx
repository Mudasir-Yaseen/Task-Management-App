// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // Adjust the import path if needed
import Sidebar from './Sidebar'; // Adjust the import path if needed
import Navbar from './Navbar';


const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 overflow-auto bg-white text-gray-800">
          <Outlet /> {/* This is where the routed components will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
