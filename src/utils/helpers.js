// src/utils/helpers.js

/**
 * Format a date to a readable string.
 * @param {Date | string} date - The date to format.
 * @returns {string} Formatted date string (e.g., 'Oct 19, 2024').
 */
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  /**
   * Capitalize the first letter of a given string.
   * @param {string} text - The text to capitalize.
   * @returns {string} The text with the first letter capitalized.
   */
  export const capitalizeFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  /**
   * Check if the user has a specific role.
   * @param {string} role - The role to check.
   * @param {string[]} userRoles - List of roles assigned to the user.
   * @returns {boolean} True if the user has the role, otherwise false.
   */
  export const hasRole = (role, userRoles) => {
    return userRoles.includes(role);
  };
  
  /**
   * Convert an object to query string parameters.
   * @param {Object} params - The object containing query parameters.
   * @returns {string} The query string (e.g., '?key1=value1&key2=value2').
   */
  export const objectToQueryString = (params) => {
    return (
      '?' +
      Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
    );
  };
  
  /**
   * Display a formatted error message to the user.
   * @param {Object} error - Error object returned from an API or service.
   * @returns {string} A user-friendly error message.
   */
  export const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };
  
  /**
   * Get a random ID for use in unique keys or IDs.
   * @param {number} length - Length of the generated ID.
   * @returns {string} A random alphanumeric string.
   */
  export const generateRandomId = (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length);
  };
  