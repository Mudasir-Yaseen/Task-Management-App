import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // Assuming useAuth provides authentication logic

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth(); // Destructuring the signup function from useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await signup(name, email, password); // Assuming signup function returns a promise
      navigate('/dashboard'); // Redirect to the dashboard on successful signup
    } catch (err) {
      setError('Signup failed. Please try again.'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-700 transition duration-500 transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-teal-400 mb-6">Create Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal-400 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-400 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-400 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-400"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-400 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-400"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-400 hover:text-teal-600 transition duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
