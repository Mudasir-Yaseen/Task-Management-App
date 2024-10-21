// src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login function; replace with actual API call
        const mockUser = { email }; // Mock user data
        setUser(mockUser);
        return Promise.resolve(mockUser); // Simulating successful login
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
