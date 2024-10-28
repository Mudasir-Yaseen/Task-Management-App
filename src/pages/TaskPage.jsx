import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskSlice';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Dialog } from "@headlessui/react";
import { PlusIcon, TrashIcon, PencilIcon, DotsVerticalIcon } from "@heroicons/react/outline";

const TasksPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const { id } = useParams();

  const [columns, setColumns] = useState({
    todo: { name: "To Do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    testing: { name: "Testing", items: [] },
    hold: { name: "Hold", items: [] },
    completed: { name: "Completed", items: [] },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [taskInputs, setTaskInputs] = useState({
    name: "",
    description: "",
    selectedUser: "User A",
    priority: "Medium",
    due_date: "", 
  });
  const [editTask, setEditTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showMenu, setShowMenu] = useState({}); // For dropdown menu visibility

  useEffect(() => {
    if (id) dispatch(fetchTasks(id));
  }, [dispatch, id]);

  useEffect(() => {
    const updatedColumns = {
      todo: { name: "To Do", items: [] },
      inProgress: { name: "In Progress", items: [] },
      testing: { name: "Testing", items: [] },
      hold: { name: "Hold", items: [] },
      completed: { name: "Completed", items: [] },
    };

    tasks.forEach((task) => {
      if (updatedColumns[task.status]) {
        updatedColumns[task.status].items.push({
          ...task,
          content: task.name,
          due_date: new Date(task.due_date).toLocaleDateString(),
        });
      }
    });

    setColumns(updatedColumns);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const [movedItem] = sourceColumn.items.splice(source.index, 1);

    destColumn.items.splice(destination.index, 0, movedItem);
    setColumns({ ...columns });

    const updatedTaskData = {
      name: movedItem.name,
      description: movedItem.description,
      due_date: movedItem.due_date,
      status: destination.droppableId, // Ensure this value matches the backend
    };

    console.log("Updating Task Data:", updatedTaskData);
    console.log("Status being sent to the API:", destination.droppableId);

    // Check if status is valid
    const validStatuses = ['todo', 'in-progress', 'testing', 'hold', 'completed'];
    if (!validStatuses.includes(destination.droppableId)) {
      console.error('Invalid status:', destination.droppableId);
      return;
    }

    dispatch(updateTask({
      projectId: id,
      taskId: movedItem.id,
      taskData: updatedTaskData
    }))
    .unwrap()
    .then(() => {
      // Handle success if needed
    })
    .catch((err) => {
      if (err.errors) {
        console.error('API errors:', err.errors);
      } else {
        console.error('Error updating task:', err);
      }
    });
  };

  const handleAddOrUpdateTask = () => {
    const errors = validateInputs(taskInputs);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const taskData = {
      name: taskInputs.name,
      description: taskInputs.description,
      assignee: taskInputs.selectedUser,
      priority: taskInputs.priority,
      due_date: taskInputs.due_date,
      status: editTask ? editTask.status : "todo",
    };

    if (editTask) {
      dispatch(updateTask({
        projectId: id,
        taskId: editTask.id,
        taskData
      }))
        .unwrap()
        .then(() => {
          resetInputs();
          dispatch(fetchTasks(id)); // Refetch tasks to get the updated list
        })
        .catch((err) => {
          console.error('Failed to update task:', err);
          if (err.errors) setValidationErrors(err.errors);
        });
    } else {
      dispatch(createTask({ projectId: id, taskData }))
        .unwrap()
        .then(() => {
          resetInputs();
          dispatch(fetchTasks(id)); // Refetch tasks to get the new task
        })
        .catch((err) => {
          console.error('Failed to create task:', err);
          if (err.errors) setValidationErrors(err.errors);
        });
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setTaskInputs({
      name: task.name,
      description: task.description,
      selectedUser: task.assignee,
      priority: task.priority,
      due_date: task.due_date,
    });
    setIsOpen(true);
  };

  const handleDeleteTask = (columnId, itemId) => {
    setConfirmDelete({ columnId, itemId });
  };

  const confirmDeleteTask = () => {
    if (!confirmDelete) return;
    dispatch(deleteTask({ projectId: id, taskId: confirmDelete.itemId }))
      .unwrap()
      .then(() => {
        setColumns((prevColumns) => {
          const updatedItems = prevColumns[confirmDelete.columnId].items.filter(
            (item) => item.id !== confirmDelete.itemId
          );
          return {
            ...prevColumns,
            [confirmDelete.columnId]: { ...prevColumns[confirmDelete.columnId], items: updatedItems },
          };
        });
        setConfirmDelete(null);
        dispatch(fetchTasks(id)); // Refetch tasks to get the updated list after deletion
      })
      .catch(console.error);
  };

  const resetInputs = () => {
    setTaskInputs({
      name: "",
      description: "",
      selectedUser: "User A",
      priority: "Medium",
      due_date: "",
    });
    setEditTask(null);
    setIsOpen(false);
    setValidationErrors({});
  };

  const validateInputs = ({ name, description, due_date }) => {
    const errors = {};
    if (!name.trim()) errors.name = "The name field is required.";
    if (!description.trim()) errors.description = "The description field is required.";
    if (!due_date) errors.due_date = "The due date field is required.";
    return errors;
  };

  const toggleMenu = (taskId) => {
    setShowMenu((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Tasks Management</h1>
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
          {error && <p className="text-red-500">{error}</p>}
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h2 className="font-bold text-xl mb-4">{column.name}</h2>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px] bg-white rounded-md p-4"
                    >
                      {column.items
                        .filter((item) => item.content.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((item, index) => (
                          <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-4 mb-4 bg-white rounded-md shadow relative"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h3 className="font-semibold">{item.content}</h3>
                                    <p>{item.description}</p>
                                    <p className="text-gray-500">{item.due_date}</p>
                                  </div>
                                  <button
                                    onClick={() => toggleMenu(item.id)}
                                    className="text-gray-600 hover:text-gray-800"
                                  >
                                    <DotsVerticalIcon className="w-5 h-5" />
                                  </button>
                                </div>
                                {showMenu[item.id] && (
                                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                                    <button
                                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                      onClick={() => handleEditTask(item)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="block px-4 py-2 text-red-500 hover:bg-red-100 w-full text-left"
                                      onClick={() => handleDeleteTask(columnId, item.id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="block px-4 py-2 text-blue-500 hover:bg-blue-100 w-full text-left"
                                      onClick={() => alert(`Showing comments for ${item.content}`)}
                                    >
                                      Show Comments
                                    </button>
                                  </div>
                                )}
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

        <Dialog open={isOpen} onClose={resetInputs} className="relative z-10">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
              <Dialog.Title className="text-lg font-bold mb-4">{editTask ? "Edit Task" : "Add Task"}</Dialog.Title>
              <div>
                <label className="block mb-2">Task Name</label>
                <input
                  type="text"
                  value={taskInputs.name}
                  onChange={(e) => setTaskInputs({ ...taskInputs, name: e.target.value })}
                  className="mb-2 w-full border rounded p-2"
                />
                {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  value={taskInputs.description}
                  onChange={(e) => setTaskInputs({ ...taskInputs, description: e.target.value })}
                  className="mb-2 w-full border rounded p-2"
                />
                {validationErrors.description && <p className="text-red-500">{validationErrors.description}</p>}
              </div>
              <div>
                <label className="block mb-2">Due Date</label>
                <input
                  type="date"
                  value={taskInputs.due_date}
                  onChange={(e) => setTaskInputs({ ...taskInputs, due_date: e.target.value })}
                  className="mb-2 w-full border rounded p-2"
                />
                {validationErrors.due_date && <p className="text-red-500">{validationErrors.due_date}</p>}
              </div>
              <div className="flex justify-end">
                <button onClick={resetInputs} className="mr-2 text-gray-600">Cancel</button>
                <button onClick={handleAddOrUpdateTask} className="bg-blue-500 text-white p-2 rounded">
                  {editTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TasksPage;
