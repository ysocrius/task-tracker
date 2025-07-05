import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '../TaskItem';

// Mock window.confirm
const mockConfirm = jest.fn();
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
});

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: '2024-01-15T10:30:00.000Z'
  };

  const mockProps = {
    task: mockTask,
    onDelete: jest.fn(),
    onToggleComplete: jest.fn(),
    onEdit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  it('renders task information correctly', () => {
    render(<TaskItem {...mockProps} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const taskWithoutDescription = { ...mockTask, description: '' };
    render(<TaskItem {...mockProps} task={taskWithoutDescription} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('shows completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem {...mockProps} task={completedTask} />);
    
    const taskItem = screen.getByText('Test Task').closest('.task-item');
    expect(taskItem).toHaveClass('completed');
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows pending state correctly', () => {
    render(<TaskItem {...mockProps} />);
    
    const taskItem = screen.getByText('Test Task').closest('.task-item');
    expect(taskItem).not.toHaveClass('completed');
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('Mark Complete')).toBeInTheDocument();
  });

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(<TaskItem {...mockProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockProps.onToggleComplete).toHaveBeenCalledWith('1');
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<TaskItem {...mockProps} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is clicked and confirmed', async () => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout
    
    render(<TaskItem {...mockProps} />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');
    
    // Fast-forward timers to trigger the onDelete callback
    jest.advanceTimersByTime(300);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
    
    jest.useRealTimers(); // Restore real timers
  });

  it('does not call onDelete when delete is cancelled', () => {
    jest.useFakeTimers();
    mockConfirm.mockReturnValue(false);
    render(<TaskItem {...mockProps} />);
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockConfirm).toHaveBeenCalled();
    
    // Fast-forward timers
    jest.advanceTimersByTime(300);
    
    expect(mockProps.onDelete).not.toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  it('formats date correctly', () => {
    render(<TaskItem {...mockProps} />);
    
    // Check that date is displayed (exact format may vary by locale)
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText(/Jan|January/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});