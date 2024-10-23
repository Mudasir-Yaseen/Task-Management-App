import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Dialog } from "@headlessui/react"; 
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/outline";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Project 1", assignee: "User A", priority: "High", dueDate: "2024-10-30" },
      { id: "2", content: "Project 2", assignee: "User B", priority: "Medium", dueDate: "2024-11-05" },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [
      { id: "3", content: "Project 3", assignee: "User C", priority: "Low", dueDate: "2024-11-10" },
      { id: "4", content: "Project 4", assignee: "User D", priority: "High", dueDate: "2024-11-12" },
    ],
  },
  done: {
    name: "Done",
    items: [{ id: "5", content: "Project 5", assignee: "User A", priority: "Medium", dueDate: "2024-10-20" }],
  },
};

const users = ["User A", "User B", "User C", "User D", "User E"];

const AdminDashboard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems },
    }));
  };

  const handleAddTask = () => {
    if (!newTask || !dueDate) return;

    const newTaskObject = {
      id: Date.now().toString(),
      content: newTask,
      assignee: selectedUser,
      priority: taskPriority,
      dueDate: dueDate,
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        items: [...prevColumns.todo.items, newTaskObject],
      },
    }));
    resetTaskInputs();
  };

  const handleEditTask = (item) => {
    setEditTask(item);
    setNewTask(item.content);
    setSelectedUser(item.assignee);
    setTaskPriority(item.priority);
    setDueDate(item.dueDate);
    setIsOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editTask) return;

    const updatedTaskObject = {
      ...editTask,
      content: newTask,
      assignee: selectedUser,
      priority: taskPriority,
      dueDate: dueDate,
    };

    const updatedColumns = { ...columns };
    for (const column of Object.values(updatedColumns)) {
      column.items = column.items.map((item) =>
        item.id === editTask.id ? updatedTaskObject : item
      );
    }

    setColumns(updatedColumns);
    resetTaskInputs();
  };

  const handleDeleteTask = (columnId, itemId) => {
    setConfirmDelete({ columnId, itemId });
  };

  const confirmDeleteTask = () => {
    if (!confirmDelete) return;

    setColumns((prevColumns) => {
      const column = prevColumns[confirmDelete.columnId];
      const filteredItems = column.items.filter((item) => item.id !== confirmDelete.itemId);
      return {
        ...prevColumns,
        [confirmDelete.columnId]: { ...column, items: filteredItems },
      };
    });
    setConfirmDelete(null);
  };

  const resetTaskInputs = () => {
    setNewTask("");
    setSelectedUser(users[0]);
    setTaskPriority("Medium");
    setDueDate("");
    setIsOpen(false);
    setEditTask(null);
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex-1 flex flex-col">
        <main className={`flex-1 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-tl-3xl`}>
          <header className="mb-8 flex justify-between items-center">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 p-2 rounded ${darkMode ? 'bg-yellow-500' : 'bg-gray-300'}`}
            >
              Toggle Dark Mode
            </button>
          </header>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border rounded"
          />
          <button onClick={() => setIsOpen(true)} className="mb-4 bg-blue-500 text-white p-2 rounded flex items-center">
            <PlusIcon className="w-5 h-5 mr-1" /> Add Task
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(columns).map(([columnId, column]) => (
                <div key={columnId} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <h2 className={`font-bold text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{column.name}</h2>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`min-h-[200px] bg-white rounded-md p-4 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                      >
                        {column.items
                          .filter((item) => item.content.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-4 mb-4 bg-white rounded-md shadow ${snapshot.isDragging ? 'bg-blue-200' : 'bg-white'}`}
                                >
                                  <div className="flex justify-between items-center">
                                    <span>{item.content}</span>
                                    <div className="flex items-center">
                                      <span className="text-xs text-gray-500">{item.priority}</span>
                                      <span className="text-xs text-gray-500 ml-2">{item.assignee}</span>
                                      <span className="text-xs text-gray-500 ml-2">{item.dueDate}</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    <button onClick={() => handleEditTask(item)} className="text-blue-500 hover:text-blue-700 mr-2">
                                      <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDeleteTask(columnId, item.id)} className="text-red-500 hover:text-red-700">
                                      <TrashIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </main>
      </div>
      <Dialog open={isOpen} onClose={resetTaskInputs}>
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded p-6">
            <Dialog.Title className="text-lg font-bold">{editTask ? "Edit Task" : "Add Task"}</Dialog.Title>
            <input
              type="text"
              placeholder="Task content"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="mt-4 mb-2 p-2 border rounded w-full"
            />
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
            >
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="flex justify-end">
              <button onClick={resetTaskInputs} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={editTask ? handleUpdateTask : handleAddTask} className="bg-blue-500 text-white p-2 rounded">
                {editTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded p-6">
            <Dialog.Title className="text-lg font-bold">Confirm Deletion</Dialog.Title>
            <p className="mt-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setConfirmDelete(null)} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={confirmDeleteTask} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
