import React from 'react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <li className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through text-gray-400' : ''}>
          {task.title}
        </span>
      </div>
      <div>
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:underline mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
