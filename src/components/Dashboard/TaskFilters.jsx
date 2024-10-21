import React from 'react';

const TaskFilters = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 font-semibold rounded-md ${
          currentFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-2 font-semibold rounded-md ${
          currentFilter === 'active'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-4 py-2 font-semibold rounded-md ${
          currentFilter === 'completed'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilters;
