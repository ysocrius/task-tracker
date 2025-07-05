import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

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

describe('Login', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    expect(screen.getByText('Login to Task Tracker')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username (3-20 characters)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('updates username input when typed', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
    expect(usernameInput.value).toBe('testuser');
  });

  it('calls onLogin with username when form is submitted', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('testuser');
    });
  });

  it('saves username to localStorage when form is submitted', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('username')).toBe('testuser');
    });
  });

  it('does not submit when username is empty', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);
    
    expect(mockOnLogin).not.toHaveBeenCalled();
    expect(localStorage.getItem('username')).toBeNull();
  });

  it('does not submit when username is only whitespace', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(usernameInput, { target: { value: '   ' } });
    fireEvent.click(submitButton);
    
    expect(mockOnLogin).not.toHaveBeenCalled();
    expect(localStorage.getItem('username')).toBeNull();
  });

  it('trims whitespace from username before submission', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(usernameInput, { target: { value: '  testuser  ' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('testuser');
      expect(localStorage.getItem('username')).toBe('testuser');
    });
  });

  it('can be submitted by pressing Enter', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.submit(screen.getByText('Login').closest('form'));
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('testuser');
    });
  });

  it('has required attribute on username input', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toHaveAttribute('required');
  });
});