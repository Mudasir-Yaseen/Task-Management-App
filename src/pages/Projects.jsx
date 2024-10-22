// src/pages/Projects.jsx

import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Projects = () => {
  const { user } = useAuth();
  
  // State for managing projects
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', assignedTo: '' });
  
  // Dummy user data for assignment (replace this with actual user fetching logic)
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  
  useEffect(() => {
    // Fetch projects from an API or database
    // For now, we'll use dummy data
    setProjects([
      { id: 1, name: 'Project A', description: 'Description A', assignedTo: 'Alice' },
      { id: 2, name: 'Project B', description: 'Description B', assignedTo: 'Bob' },
    ]);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCreateProject = (e) => {
    e.preventDefault();
    const projectId = projects.length + 1;
    setProjects([...projects, { id: projectId, ...newProject }]);
    setNewProject({ name: '', description: '', assignedTo: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Projects</h2>
      
      {/* Project List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Project List</h3>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
              <h4 className="font-bold">{project.name}</h4>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">Assigned to: {project.assignedTo}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Create New Project */}
      {user.isAdmin && ( // Show this form only if the user is an admin
        <form onSubmit={handleCreateProject} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Create New Project</h3>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={newProject.name}
            onChange={handleInputChange}
            required
            className="border p-2 mb-2 w-full rounded"
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            required
            className="border p-2 mb-2 w-full rounded"
          />
          <select
            name="assignedTo"
            value={newProject.assignedTo}
            onChange={handleInputChange}
            required
            className="border p-2 mb-2 w-full rounded"
          >
            <option value="">Assign to User</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
          >
            Create Project
          </button>
        </form>
      )}
    </div>
  );
};

export default Projects;
