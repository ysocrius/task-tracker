// Mock localStorage utilities
export const getStoredTasks = jest.fn().mockReturnValue([]);
export const getStoredUsername = jest.fn().mockReturnValue(null);
export const saveStoredTasks = jest.fn().mockReturnValue(true);
export const saveStoredUsername = jest.fn().mockReturnValue(true);
export const clearStoredUserData = jest.fn().mockReturnValue(true);
export const getTasks = jest.fn().mockReturnValue([]);
export const saveTasks = jest.fn().mockReturnValue(true);
export const getUsername = jest.fn().mockReturnValue(null);
export const saveUsername = jest.fn().mockReturnValue(true);
export const clearUserData = jest.fn().mockReturnValue(true); 