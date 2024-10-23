// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Get setUser from the context

    // Access loading and error state from Redux store
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await dispatch(loginUser({ email, password })).unwrap();
            setUser(userData); // Set the user in context

            // Navigate based on user role
            if (userData.role === 'admin') {
                navigate('/admin');
            } else if (userData.role === 'user') {
                navigate('/dashboard');
            } else {
                console.error('Invalid user role.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-700 transition duration-500 transform hover:scale-105 hover:shadow-2xl">
                <h2 className="text-4xl font-bold text-center text-teal-400 mb-6">Login</h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error.message || 'Login failed. Please check your credentials.'}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-teal-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 placeholder-gray-400"
                            placeholder="Email"
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
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-teal-400 hover:text-teal-600 transition duration-300">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
