import { getTasks, saveTasks, getUsername, saveUsername, clearUserData } from '../localStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('localStorage utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getTasks', () => {
    it('should return empty array when no tasks are stored', () => {
      const tasks = getTasks();
      expect(tasks).toEqual([]);
    });

    it('should return parsed tasks from localStorage', () => {
      const mockTasks = [
        { id: '1', title: 'Test Task', completed: false },
        { id: '2', title: 'Another Task', completed: true }
      ];
      localStorage.setItem('tasks', JSON.stringify(mockTasks));

      const tasks = getTasks();
      expect(tasks).toEqual(mockTasks);
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('tasks', 'invalid json');
      
      // Should not throw and return empty array
      expect(() => getTasks()).not.toThrow();
      const tasks = getTasks();
      expect(tasks).toEqual([]);
    });
  });

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const mockTasks = [
        { id: '1', title: 'Test Task', completed: false }
      ];

      saveTasks(mockTasks);
      
      const stored = localStorage.getItem('tasks');
      expect(stored).toBe(JSON.stringify(mockTasks));
    });

    it('should handle empty array', () => {
      saveTasks([]);
      
      const stored = localStorage.getItem('tasks');
      expect(stored).toBe('[]');
    });
  });

  describe('getUsername', () => {
    it('should return null when no username is stored', () => {
      const username = getUsername();
      expect(username).toBeNull();
    });

    it('should return stored username', () => {
      localStorage.setItem('username', 'testuser');
      
      const username = getUsername();
      expect(username).toBe('testuser');
    });
  });

  describe('saveUsername', () => {
    it('should save username to localStorage', () => {
      saveUsername('testuser');
      
      const stored = localStorage.getItem('username');
      expect(stored).toBe('testuser');
    });
  });

  describe('clearUserData', () => {
    it('should remove username from localStorage', () => {
      localStorage.setItem('username', 'testuser');
      localStorage.setItem('tasks', '[]');
      
      clearUserData();
      
      expect(localStorage.getItem('username')).toBeNull();
      // Tasks should remain (as per current implementation)
      expect(localStorage.getItem('tasks')).toBe('[]');
    });
  });
});