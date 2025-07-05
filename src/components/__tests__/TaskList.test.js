import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../TaskList';

describe('TaskList', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Completed Task',
      description: 'This is completed',
      completed: true,
      createdAt: '2024-01-15T10:30:00.000Z'
    },
    {
      id: '2',
      title: 'Pending Task',
      description: 'This is pending',
      completed: false,
      createdAt: '2024-01-16T10:30:00.000Z'
    },
    {
      id: '3',
      title: 'Another Pending Task',
      description: 'This is also pending',
      completed: false,
      createdAt: '2024-01-17T10:30:00.000Z'
    }
  ];

  const mockProps = {
    tasks: mockTasks,
    onDelete: jest.fn(),
    onToggleComplete: jest.fn(),
    onEdit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tasks when filter is "all"', () => {
    render(<TaskList {...mockProps} filter="all" />);
    
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.getByText('Pending Task')).toBeInTheDocument();
    expect(screen.getByText('Another Pending Task')).toBeInTheDocument();
  });

  it('renders only completed tasks when filter is "completed"', () => {
    render(<TaskList {...mockProps} filter="completed" />);
    
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.queryByText('Pending Task')).not.toBeInTheDocument();
    expect(screen.queryByText('Another Pending Task')).not.toBeInTheDocument();
  });

  it('renders only pending tasks when filter is "pending"', () => {
    render(<TaskList {...mockProps} filter="pending" />);
    
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
    expect(screen.getByText('Pending Task')).toBeInTheDocument();
    expect(screen.getByText('Another Pending Task')).toBeInTheDocument();
  });

  it('shows no tasks message when no tasks match filter', () => {
    const emptyProps = { ...mockProps, tasks: [] };
    render(<TaskList {...emptyProps} filter="all" />);
    
    expect(screen.getByText('No tasks found. Add a new task to get started!')).toBeInTheDocument();
  });

  it('shows no tasks message when filter returns empty results', () => {
    // Only completed tasks, but filter is "pending"
    const onlyCompletedTasks = mockTasks.filter(task => task.completed);
    render(<TaskList {...mockProps} tasks={onlyCompletedTasks} filter="pending" />);
    
    expect(screen.getByText('No tasks found. Add a new task to get started!')).toBeInTheDocument();
  });

  it('passes correct props to TaskItem components', () => {
    render(<TaskList {...mockProps} filter="all" />);
    
    // Check that all tasks are rendered with their titles
    mockTasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
    
    // Check that action buttons are present (indicating props are passed)
    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');
    
    expect(editButtons).toHaveLength(mockTasks.length);
    expect(deleteButtons).toHaveLength(mockTasks.length);
  });

  it('renders tasks in the order they appear in the array', () => {
    render(<TaskList {...mockProps} filter="all" />);
    
    const taskElements = screen.getAllByText(/Task/);
    expect(taskElements[0]).toHaveTextContent('Completed Task');
    expect(taskElements[1]).toHaveTextContent('Pending Task');
    expect(taskElements[2]).toHaveTextContent('Another Pending Task');
  });
});