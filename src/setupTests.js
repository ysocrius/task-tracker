// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock localStorage for all tests
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

// Mock window.confirm for all tests
Object.defineProperty(window, 'confirm', {
  value: jest.fn(() => true),
  writable: true
});

// Mock window.alert for all tests
Object.defineProperty(window, 'alert', {
  value: jest.fn(),
  writable: true
});

// Clean up after each test
afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});