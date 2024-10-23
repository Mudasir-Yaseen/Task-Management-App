import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Project 1" },
      { id: "2", content: "Project 2" }
    ]
  },
  inProgress: {
    name: "In Progress",
    items: [
      { id: "3", content: "Project 3" },
      { id: "4", content: "Project 4" }
    ]
  },
  done: {
    name: "Done",
    items: [
      { id: "5", content: "Project 5" }
    ]
  }
};

const AdminDashboard = () => {
  const [columns, setColumns] = useState(initialColumns);

  // Function to handle drag end
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col">
       
        <main className="flex-1 p-8 bg-white shadow-xl rounded-tl-3xl">
          
          {/* Dashboard Heading */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage tasks and monitor notifications for users.</p>
          </header>
          
          {/* Admin Panel Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Total Tasks</h2>
              <p className="text-4xl font-semibold">128</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Pending Approvals</h2>
              <p className="text-4xl font-semibold">14</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">User Registrations</h2>
              <p className="text-4xl font-semibold">35</p>
            </div>
          </section>

          {/* Kanban Board */}
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(columns).map(([columnId, column], index) => (
                <div key={columnId} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <h2 className="font-bold text-xl mb-4">{column.name}</h2>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`min-h-[200px] bg-white rounded-md p-4 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                      >
                        {column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-4 mb-4 bg-white rounded-md shadow ${snapshot.isDragging ? 'bg-blue-200' : 'bg-white'}`}
                              >
                                {item.content}
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
    </div>
  );
};

export default AdminDashboard;
