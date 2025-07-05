import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router-dom
jest.mock('react-router-dom');

// Mock localStorage utilities
jest.mock('../utils/localStorage', () => ({
  getTasks: jest.fn().mockReturnValue([]),
  getUsername: jest.fn().mockReturnValue(null),
  saveTasks: jest.fn().mockReturnValue(true),
  saveUsername: jest.fn().mockReturnValue(true),
  clearUserData: jest.fn().mockReturnValue(true)
}));

// Import App after mocking dependencies
import App from '../App';
import { getUsername, getTasks } from '../utils/localStorage';

// Mock window.localStorage
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

// Mock window.confirm
const mockConfirm = jest.fn();
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
});

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockConfirm.mockReturnValue(true);
    getTasks.mockReturnValue([]);
  });

  describe('Authentication Flow', () => {
    it('shows login form when user is not logged in', () => {
      getUsername.mockReturnValue(null);
      render(<App />);
      
      expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    });

    it('shows task dashboard when username is in localStorage', () => {
      getUsername.mockReturnValue('testuser');
      render(<App />);
      
      // With our mocked router, we should see a Navigate component
      const navigate = screen.getByTestId('navigate');
      expect(navigate).toHaveAttribute('data-to', '/tasks');
    });
  });
});