import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectSlice';
import { fetchUsers } from '../services/userSlice';
import useAuth from '../hooks/useAuth';
import { CheckCircleIcon, DotsVerticalIcon, UserAddIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';

const Projects = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { projects, loading, totalProjects } = useSelector((state) => state.projects);
  const { users, loading: usersLoading } = useSelector((state) => state.users);

  const [newProject, setNewProject] = useState({ name: '', description: '', assignedTo: '', is_active: true });
  const [editProject, setEditProject] = useState(null);
  const [assignProject, setAssignProject] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [page, setPage] = useState(1);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const limit = 10;

  useEffect(() => {
    dispatch(fetchProjects({ page, limit }));
  }, [dispatch, page]);

  useEffect(() => {
    if (showCreateForm && users.length === 0) {
      dispatch(fetchUsers({ page: 1, limit: 100 }));
    }
  }, [showCreateForm, dispatch, users.length]);

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
      dispatch(fetchProjects({ page, limit }));
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (editProject) {
      try {
        await dispatch(updateProject({ id: editProject.id, projectData: editProject })).unwrap();
        setEditProject(null);
      } catch (error) {
        console.error('Failed to update project', error);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
      dispatch(fetchProjects({ page, limit }));
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const handleOpenModal = (project) => {
    setAssignProject({ ...project, is_active: project.is_active || true }); // Ensure is_active is set
    setIsModalOpen(true);
  };

  const handleAssignProject = async () => {
    if (assignProject) {
      try {
        await dispatch(updateProject({
          id: assignProject.id,
          projectData: { 
            ...assignProject, 
            is_active: assignProject.is_active !== undefined ? assignProject.is_active : true, // Ensure is_active is a boolean
          }
        })).unwrap();
        setAssignProject(null);
        setIsModalOpen(false); // Close the modal after assigning
      } catch (error) {
        console.error('Failed to re-assign project', error);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalProjects / limit);

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>

      {user.role === 'admin' && (
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-200 shadow"
          >
            {showCreateForm ? "Cancel" : "Create New Project"}
          </button>

          {showCreateForm && (
            <form onSubmit={handleCreateProject} className="bg-white p-4 mt-4 rounded shadow">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newProject.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-3 mb-3 w-full rounded"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-3 mb-3 w-full rounded"
              />
              <input
                type="text"
                placeholder="Search Users..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="border border-gray-300 p-3 mb-3 w-full rounded"
              />
              {usersLoading ? (
                <p>Loading users...</p>
              ) : (
                <select
                  name="assignedTo"
                  value={newProject.assignedTo}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 p-3 mb-3 w-full rounded"
                >
                  <option value="">Assign to User</option>
                  {filteredUsers.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              )}
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-700 transition duration-200 shadow"
              >
                Create Project
              </button>
            </form>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Project List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-5 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-50 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-gray-600">{project.description}</p>
                    <p className="text-sm text-gray-500">Assigned to: {project.assignedTo}</p>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <Link to={`/tasks/${project.id}`} className="text-blue-600 hover:text-blue-800">
                      <CheckCircleIcon className="w-6 h-6" />
                    </Link>
                    <button
                      onClick={() => handleOpenModal(project)} // Open modal for assignment
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <UserAddIcon className="w-6 h-6" />
                    </button>

                    {user.role === 'admin' && (
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="flex items-center text-gray-600 hover:text-gray-800">
                            <DotsVerticalIcon className="w-5 h-5" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => setEditProject({ ...project })}
                                    className={`${
                                      active ? 'bg-gray-200' : ''
                                    } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className={`${
                                      active ? 'bg-gray-200' : ''
                                    } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
                                  >
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Assign Project</h3>
            <select
              name="assignedTo"
              value={assignProject?.assignedTo}
              onChange={(e) => setAssignProject({ ...assignProject, assignedTo: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded mb-4"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
            <button
              onClick={handleAssignProject}
              className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
            >
              Assign
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
