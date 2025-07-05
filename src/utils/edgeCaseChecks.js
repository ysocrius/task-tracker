/**
 * Utility functions to check and handle edge cases
 */
import { isValidFutureDate } from './dateUtils';

/**
 * Validates task input - title is required and must be within limits
 * @param {Object} task - The task to validate
 * @returns {Object} - Contains isValid and error message
 */
export const validateTaskInput = (task) => {
  if (!task.title || task.title.trim() === '') {
    return {
      isValid: false,
      error: 'Task title is required'
    };
  }

  if (task.title.length > 100) {
    return {
      isValid: false,
      error: 'Task title must be less than 100 characters'
    };
  }

  if (task.description && task.description.length > 500) {
    return {
      isValid: false,
      error: 'Task description must be less than 500 characters'
    };
  }

  // Validate due date if present
  if (task.dueDate && !isValidFutureDate(task.dueDate)) {
    return {
      isValid: false,
      error: 'Due date cannot be in the past'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Safely access localStorage with fallbacks
 * @param {string} key - localStorage key to retrieve
 * @param {*} defaultValue - default value if storage is unavailable
 */
export const safelyGetFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return defaultValue;
  }
};

/**
 * Safely save to localStorage with error handling
 * @param {string} key - localStorage key
 * @param {*} value - value to store
 */
export const safelySetToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Sanitize input to prevent XSS or injection
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Truncate text with ellipsis for display
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Check if browser storage is available
 * @returns {boolean} - Whether localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Format error messages for user display
 * @param {string} message - Error message
 * @returns {string} - Formatted message
 */
export const formatErrorMessage = (message) => {
  return `Error: ${message}`;
}; 