// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './Routes/AppRoutes';

const App = () => {
    return (
        <AuthProvider>
            <TaskProvider>
                <NotificationProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                </NotificationProvider>
            </TaskProvider>
        </AuthProvider>
    );
};

export default App;
