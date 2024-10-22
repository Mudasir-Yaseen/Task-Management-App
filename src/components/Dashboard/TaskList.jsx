import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const sampleTasks = [
  { id: 1, title: 'Design the landing page', completed: false },
  { id: 2, title: 'Develop the API', completed: true },
  { id: 3, title: 'Implement authentication', completed: false },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!newTaskTitle) return;
    const newTask = { id: Date.now(), title: newTaskTitle, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setNewTaskTitle(task.title);
    setEditingTask(task.id);
  };

  const updateTask = () => {
    if (!newTaskTitle || !editingTask) return;
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, title: newTaskTitle } : task
    );
    setTasks(updatedTasks);
    setNewTaskTitle('');
    setEditingTask(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Task List</h2>
      <TaskFilters currentFilter={filter} onFilterChange={handleFilterChange} />
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500"
          placeholder="Add a new task"
        />
        <button
          onClick={editingTask ? updateTask : addTask}
          className="ml-3 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleCompletion}
            onEdit={startEditing}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
