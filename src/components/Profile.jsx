import React, { useState } from 'react';

const Profile = () => {
  // Sample user data, replace with actual user data from context or API
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User', // or 'Admin'
  });

  // Local state for editing user details
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(editedUser);
    setIsEditing(false);
    // Here you could also send the updated user data to the server
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              readOnly
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md p-2 w-full hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {user.role}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white rounded-md p-2 mt-4 hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
