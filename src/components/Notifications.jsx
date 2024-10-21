import React from 'react';

const notificationsData = [
  { id: 1, message: 'Your task "Design Mockup" is due tomorrow.', time: '2 hours ago' },
  { id: 2, message: 'You have a new comment on "Implement Login Page".', time: '1 day ago' },
  { id: 3, message: 'Task "Review PR" has been approved.', time: '3 days ago' },
  { id: 4, message: 'You were added to the task "Team Meeting".', time: '1 week ago' },
];

const Notifications = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-4">
        {notificationsData.length === 0 ? (
          <li className="text-gray-500">No notifications available.</li>
        ) : (
          notificationsData.map((notification) => (
            <li key={notification.id} className="border-b border-gray-300 pb-2">
              <p className="text-gray-700">{notification.message}</p>
              <span className="text-gray-500 text-sm">{notification.time}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
