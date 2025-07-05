/**
 * Date formatting utility functions
 */

/**
 * Format a date string for display with time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Invalid date
      return dateString;
    }
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Format a date string for display without time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDueDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Invalid date
      return dateString;
    }
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting due date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Calculate if a due date is approaching or overdue
 * @param {string} dateString - ISO date string
 * @returns {string} Status: 'overdue', 'approaching', or ''
 */
export const getDueDateStatus = (dateString) => {
  if (!dateString) return '';
  
  try {
    const dueDate = new Date(dateString);
    if (isNaN(dueDate.getTime())) {
      // Invalid date
      return '';
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'approaching';
    return '';
  } catch (error) {
    console.error('Error calculating due date status:', error);
    return '';
  }
};

/**
 * Get today's date as YYYY-MM-DD for date inputs
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is in the future
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} True if date is in the future
 */
export const isValidFutureDate = (dateString) => {
  if (!dateString) return true; // No date is valid
  
  try {
    const inputDate = new Date(dateString);
    if (isNaN(inputDate.getTime())) {
      // Invalid date
      console.error('Invalid date format:', dateString);
      return false;
    }
    
    inputDate.setHours(0, 0, 0, 0); // Set to beginning of day
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    return inputDate >= today;
  } catch (error) {
    console.error('Error validating future date:', error);
    return false;
  }
}; 