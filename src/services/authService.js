// src/services/authService.js

const API_URL = "https://your-backend-api.com/api/auth"; // Replace with your actual API URL

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save the user data or token in localStorage or sessionStorage
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Function to handle user signup
export const signup = async (email, password, name) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Function to handle user logout
export const logout = () => {
  localStorage.removeItem("user");
  // Optionally, handle any other cleanup required on logout
};

// Function to get the current logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Function to check if a user is authenticated
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return user !== null;
};
