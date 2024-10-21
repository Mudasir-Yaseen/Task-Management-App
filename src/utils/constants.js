// src/utils/constants.js

// User roles
export const USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
  };
  
  // API response status codes
  export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };
  
  // Task status options
  export const TASK_STATUSES = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
  };
  
  // Notification types
  export const NOTIFICATION_TYPES = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
  };
  
  // Common error messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error. Please try again later.",
    AUTH_ERROR: "Authentication failed. Please login again.",
    FORBIDDEN: "You do not have permission to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    GENERIC_ERROR: "An error occurred. Please try again.",
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    AUTH_TOKEN: "authToken",
    USER_DATA: "userData",
  };
  
  // Base URL for the API
  export const BASE_API_URL = "https://your-backend-api.com/api"; // Replace with your actual API URL
  