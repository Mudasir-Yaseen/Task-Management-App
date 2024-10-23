// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users'); // Update with your API endpoint
  return response.data; // Assuming your API returns an array of users
});

// Create a user slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Add your synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Populate users with the fetched data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error
      });
  },
});

// Export the async thunk for use in components
export { fetchUsers };

// Export the reducer
export default userSlice.reducer;
