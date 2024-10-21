// src/utils/validators.js

/**
 * Validate if an email address is in the correct format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate if a password meets the required strength criteria.
   * The password should have at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password is strong, otherwise false.
   */
  export const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  /**
   * Validate if a string is not empty or only contains whitespace.
   * @param {string} value - The string to validate.
   * @returns {boolean} True if the string is not empty, otherwise false.
   */
  export const isNotEmpty = (value) => {
    return value.trim().length > 0;
  };
  
  /**
   * Validate if a username meets the criteria (no special characters, only letters and numbers).
   * @param {string} username - The username to validate.
   * @returns {boolean} True if the username is valid, otherwise false.
   */
  export const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
  };
  
  /**
   * Validate if a date is in the correct format and is a valid date.
   * @param {string} date - The date to validate.
   * @returns {boolean} True if the date is valid, otherwise false.
   */
  export const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };
  
  /**
   * Validate if a URL is in the correct format.
   * @param {string} url - The URL to validate.
   * @returns {boolean} True if the URL is valid, otherwise false.
   */
  export const isValidURL = (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  };
  