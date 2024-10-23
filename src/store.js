// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/authService'; // Update the import path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer, // Use 'auth' as the key for your authSlice
  },
});

export default store;
