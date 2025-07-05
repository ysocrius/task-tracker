import { 
  safelyGetFromStorage, 
  safelySetToStorage, 
  isStorageAvailable 
} from './edgeCaseChecks';

// Check if localStorage is available
const storageAvailable = isStorageAvailable();

// Function to get tasks from localStorage with error handling
export const getTasks = () => {
  if (!storageAvailable) {
    console.warn('localStorage is not available, using in-memory fallback');
    return [];
  }
  
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error retrieving tasks from localStorage:', error);
    return [];
  }
};

// Function to save tasks to localStorage with error handling
export const saveTasks = (tasks) => {
  if (!storageAvailable) {
    console.warn('localStorage is not available, changes will not persist');
    return false;
  }
  
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    // Handle storage quota errors
    if (error instanceof DOMException && error.code === 22) {
      alert('Storage quota exceeded. Some data may not be saved.');
    }
    return false;
  }
};

// Function to get username from localStorage with error handling
export const getUsername = () => {
  if (!storageAvailable) {
    console.warn('localStorage is not available, using in-memory fallback');
    return null;
  }
  
  try {
    return localStorage.getItem('username');
  } catch (error) {
    console.error('Error retrieving username from localStorage:', error);
    return null;
  }
};

// Function to save username to localStorage with error handling
export const saveUsername = (username) => {
  if (!storageAvailable) {
    console.warn('localStorage is not available, changes will not persist');
    return false;
  }
  
  if (!username || username.trim() === '') {
    console.error('Username cannot be empty');
    return false;
  }
  
  try {
    localStorage.setItem('username', username);
    return true;
  } catch (error) {
    console.error('Error saving username to localStorage:', error);
    return false;
  }
};

// Function to clear user data (for logout) with error handling
export const clearUserData = () => {
  if (!storageAvailable) {
    console.warn('localStorage is not available');
    return false;
  }
  
  try {
    localStorage.removeItem('username');
    // Optionally, uncomment to also clear tasks on logout
    // localStorage.removeItem('tasks');
    return true;
  } catch (error) {
    console.error('Error clearing user data from localStorage:', error);
    return false;
  }
};
