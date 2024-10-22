// KanbanBoard.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: [
    { id: '1', title: 'Design the landing page' },
    { id: '2', title: 'Develop the API' },
  ],
  inProgress: [
    { id: '3', title: 'Implement authentication' },
  ],
  done: [
    { id: '4', title: 'Create user documentation' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    // Check if destination exists
    if (!result.destination) return;

    const { source, destination } = result;

    // If moving between lists
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = tasks[source.droppableId];
      const destColumn = tasks[destination.droppableId];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    } else {
      // Moving within the same list
      const column = tasks[source.droppableId];
      const [movedTask] = column.splice(source.index, 1);
      column.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: column,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.keys(tasks).map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-bold mb-4 capitalize">{columnId}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white rounded-md p-3 mb-2 shadow-sm hover:bg-teal-100 transition duration-200"
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
