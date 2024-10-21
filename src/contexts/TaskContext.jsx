// src/contexts/TaskContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Creating the TaskContext
const TaskContext = createContext();

// TaskProvider Component to manage task-related state
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to update a task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for using TaskContext
const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Exporting the TaskContext, TaskProvider, and useTasks hook
export { TaskProvider, useTasks };
export default TaskContext;
