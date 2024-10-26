import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectSlice';
import { fetchUsers } from '../services/userSlice';
import useAuth from '../hooks/useAuth';
import { CheckCircleIcon } from '@heroicons/react/outline';

const Projects = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { projects, loading } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);

  const [newProject, setNewProject] = useState({ name: '', description: '', assignedTo: '', is_active: true });
  const [editProject, setEditProject] = useState(null);
  const [assignProject, setAssignProject] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects({ page: 1, limit: 10 }));
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProject(newProject)).unwrap();
      setNewProject({ name: '', description: '', assignedTo: '', is_active: true });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (editProject) {
      try {
        const updatedProject = { ...editProject, is_active: editProject.is_active ?? true }; // Ensure is_active is boolean
        await dispatch(updateProject({ id: editProject.id, projectData: updatedProject })).unwrap();
        setEditProject(null);
      } catch (error) {
        console.error('Failed to update project', error);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const handleReassignProject = async (e) => {
    e.preventDefault();
    if (assignProject) {
      try {
        await dispatch(updateProject({ id: assignProject.id, projectData: { ...assignProject, assignedTo: assignProject.assignedTo }})).unwrap();
        setAssignProject(null);
      } catch (error) {
        console.error('Failed to re-assign project', error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Projects</h2>

      {user.isAdmin && (
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
          >
            {showCreateForm ? "Cancel" : "Create New Project"}
          </button>

          {showCreateForm && (
            <form onSubmit={handleCreateProject} className="mb-6">
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
                {users.map(user => (
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
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Project List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 border rounded-md shadow-sm bg-gray-50 flex justify-between items-center relative"
              >
                <div>
                  <h4 className="font-bold">{project.name}</h4>
                  <p>{project.description}</p>
                  <p className="text-sm text-gray-600">Assigned to: {project.assignedTo}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Link to={`/tasks`} className="text-teal-600 hover:text-teal-700">
                    <CheckCircleIcon className="w-6 h-6" />
                  </Link>
                  <button
                    onClick={() => setEditProject({ ...project })} // Spread project to maintain state
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setAssignProject({ ...project })} // Spread project to maintain state
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Re-assign
                  </button>
                </div>

                {editProject && editProject.id === project.id && (
                  <div className="absolute top-0 left-0 right-0 mt-10 bg-white shadow-lg p-4 rounded-lg z-10 transition-all ease-in-out duration-300">
                    <h3 className="text-lg font-semibold mb-2">Edit Project</h3>
                    <input
                      type="text"
                      name="name"
                      value={editProject.name}
                      onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                      required
                      className="border p-2 mb-2 w-full rounded"
                    />
                    <textarea
                      name="description"
                      value={editProject.description}
                      onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                      required
                      className="border p-2 mb-2 w-full rounded"
                    />
                    <button
                      onClick={handleEditProject}
                      className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
                    >
                      Update Project
                    </button>
                    <button
                      onClick={() => setEditProject(null)} // Close modal
                      className="text-gray-600 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {assignProject && assignProject.id === project.id && (
                  <div className="absolute top-0 left-0 right-0 mt-10 bg-white shadow-lg p-4 rounded-lg z-10 transition-all ease-in-out duration-300">
                    <h3 className="text-lg font-semibold mb-2">Re-assign Project</h3>
                    <select
                      name="assignedTo"
                      value={assignProject.assignedTo}
                      onChange={(e) => setAssignProject({ ...assignProject, assignedTo: e.target.value })}
                      required
                      className="border p-2 mb-2 w-full rounded"
                    >
                      <option value="">Assign to User</option>
                      {users.map(user => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleReassignProject}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Re-assign Project
                    </button>
                    <button
                      onClick={() => setAssignProject(null)} // Close modal
                      className="text-gray-600 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Projects;
