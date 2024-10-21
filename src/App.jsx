// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { NotificationProvider } from './contexts/NotificationContext';

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
