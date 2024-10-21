// src/services/api.js

const BASE_URL = "https://your-backend-api.com/api"; // Replace with your actual API URL

// Helper function to handle API requests
const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add the token to headers if it exists
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  // Include request body for POST, PUT, or PATCH requests
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong with the API request");
    }

    return responseData;
  } catch (error) {
    console.error(`API request error: ${error.message}`);
    throw error;
  }
};

// Function to fetch data (GET request)
export const fetchData = (endpoint, token = null) => {
  return apiRequest(endpoint, "GET", null, token);
};

// Function to create new data (POST request)
export const createData = (endpoint, data, token = null) => {
  return apiRequest(endpoint, "POST", data, token);
};

// Function to update existing data (PUT request)
export const updateData = (endpoint, data, token = null) => {
  return apiRequest(endpoint, "PUT", data, token);
};

// Function to delete data (DELETE request)
export const deleteData = (endpoint, token = null) => {
  return apiRequest(endpoint, "DELETE", null, token);
};

export default {
  fetchData,
  createData,
  updateData,
  deleteData,
};
