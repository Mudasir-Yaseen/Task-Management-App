import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
  },
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// Add other API methods as needed
