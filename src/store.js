// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/authService'; // Update the import path as necessary
import userReducer from './services/userSlice'
import projectReducer from './services/projectSlice'
import taskReducer from './services/taskSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, // Use 'auth' as the key for your authSlice
    users: userReducer, // Add the user reducer
    projects: projectReducer,
    tasks: taskReducer,

  },
});

export default store;
