import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockSetTaskToEdit = jest.fn();

  const defaultProps = {
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    setTaskToEdit: mockSetTaskToEdit,
    taskToEdit: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Add Task Mode', () => {
    it('renders form in add mode correctly', () => {
      render(<TaskForm {...defaultProps} />);
      
      expect(screen.getByText('Add New Task')).toBeInTheDocument();
      expect(screen.getByLabelText('Title *')).toBeInTheDocument();
      expect(screen.getByLabelText('Description (optional)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    });

    it('updates form fields when typed', () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const descriptionInput = screen.getByLabelText('Description (optional)');
      
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
      
      expect(titleInput.value).toBe('New Task');
      expect(descriptionInput.value).toBe('Task description');
    });

    it('calls addTask when form is submitted with valid data', async () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const descriptionInput = screen.getByLabelText('Description (optional)');
      const submitButton = screen.getByRole('button', { name: 'Add Task' });
      
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith({
          title: 'New Task',
          description: 'Task description',
          completed: false,
          createdAt: expect.any(String),
          priority: 'medium'
        });
      });
    });

    it('resets form after successful submission', async () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const descriptionInput = screen.getByLabelText('Description (optional)');
      const submitButton = screen.getByRole('button', { name: 'Add Task' });
      
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(titleInput.value).toBe('');
        expect(descriptionInput.value).toBe('');
      });
    });

    it('does not submit when title is empty', () => {
      render(<TaskForm {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Add Task' });
      fireEvent.click(submitButton);
      
      expect(mockAddTask).not.toHaveBeenCalled();
    });

    it('does not submit when title is only whitespace', () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const submitButton = screen.getByRole('button', { name: 'Add Task' });
      
      fireEvent.change(titleInput, { target: { value: '   ' } });
      fireEvent.click(submitButton);
      
      expect(mockAddTask).not.toHaveBeenCalled();
    });

    it('can be submitted by pressing Enter', async () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const form = screen.getByText('Add Task').closest('form');
      
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalled();
      });
    });
  });

  describe('Edit Task Mode', () => {
    const taskToEdit = {
      id: '1',
      title: 'Existing Task',
      description: 'Existing description',
      completed: false,
      createdAt: '2024-01-15T10:30:00.000Z'
    };

    const editProps = {
      ...defaultProps,
      taskToEdit
    };

    it('renders form in edit mode correctly', () => {
      render(<TaskForm {...editProps} />);
      
      expect(screen.getByText('Edit Task')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Update Task' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('pre-fills form with task data in edit mode', () => {
      render(<TaskForm {...editProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const descriptionInput = screen.getByLabelText('Description (optional)');
      
      expect(titleInput.value).toBe('Existing Task');
      expect(descriptionInput.value).toBe('Existing description');
    });

    it('calls updateTask when form is submitted in edit mode', async () => {
      render(<TaskForm {...editProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const submitButton = screen.getByRole('button', { name: 'Update Task' });
      
      fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith({
          ...taskToEdit,
          title: 'Updated Task',
          description: 'Existing description',
          priority: 'medium'
        });
      });
    });

    it('calls setTaskToEdit(null) after successful update', async () => {
      render(<TaskForm {...editProps} />);
      
      const submitButton = screen.getByRole('button', { name: 'Update Task' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSetTaskToEdit).toHaveBeenCalledWith(null);
      });
    });

    it('cancels edit mode when cancel button is clicked', () => {
      render(<TaskForm {...editProps} />);
      
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(cancelButton);
      
      expect(mockSetTaskToEdit).toHaveBeenCalledWith(null);
    });

    it('resets form when cancel button is clicked', () => {
      render(<TaskForm {...editProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const descriptionInput = screen.getByLabelText('Description (optional)');
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      
      // Modify the form
      fireEvent.change(titleInput, { target: { value: 'Modified Title' } });
      
      // Cancel
      fireEvent.click(cancelButton);
      
      // Form should be reset
      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });

    it('preserves completed status and createdAt when updating', async () => {
      const completedTask = { ...taskToEdit, completed: true };
      const props = { ...defaultProps, taskToEdit: completedTask };
      
      render(<TaskForm {...props} />);
      
      const submitButton = screen.getByRole('button', { name: 'Update Task' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith({
          ...completedTask,
          title: 'Existing Task',
          description: 'Existing description',
          priority: 'medium'
        });
      });
    });
  });

  describe('Form Validation', () => {
    it('has required attribute on title input', () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      expect(titleInput).toHaveAttribute('required');
    });

    it('can be submitted by pressing Enter', async () => {
      render(<TaskForm {...defaultProps} />);
      
      const titleInput = screen.getByLabelText('Title *');
      const form = screen.getByText('Add Task').closest('form');
      
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalled();
      });
    });
  });
});