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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-teal-300 focus:outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-teal-300 focus:outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full bg-gray-100 cursor-not-allowed"
              required
              readOnly
            />
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white rounded-md py-3 w-full hover:bg-teal-500 transition-colors duration-200"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">
            <strong className="font-semibold">Name:</strong> {user.name}
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="text-gray-700 mb-6">
            <strong className="font-semibold">Role:</strong> {user.role}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-600 text-white rounded-md py-3 w-full hover:bg-teal-500 transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
