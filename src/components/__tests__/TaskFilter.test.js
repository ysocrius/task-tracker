import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskFilter from '../TaskFilter';

describe('TaskFilter', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', completed: true },
    { id: '2', title: 'Task 2', completed: false },
    { id: '3', title: 'Task 3', completed: false },
    { id: '4', title: 'Task 4', completed: true }
  ];

  const mockProps = {
    tasks: mockTasks,
    filter: 'all',
    setFilter: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter buttons', () => {
    render(<TaskFilter {...mockProps} />);
    
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Pending/)).toBeInTheDocument();
  });

  it('displays correct task counts', () => {
    render(<TaskFilter {...mockProps} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByTestId('all-count')).toHaveTextContent('4');
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByTestId('completed-count')).toHaveTextContent('2');
    
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByTestId('pending-count')).toHaveTextContent('2');
  });

  it('highlights active filter button', () => {
    render(<TaskFilter {...mockProps} filter="completed" />);
    
    const allButton = screen.getByText(/All/).closest('button');
    const completedButton = screen.getByText(/Completed/).closest('button');
    const pendingButton = screen.getByText(/Pending/).closest('button');
    
    expect(allButton).not.toHaveClass('active');
    expect(completedButton).toHaveClass('active');
    expect(pendingButton).not.toHaveClass('active');
  });

  it('calls setFilter when filter buttons are clicked', () => {
    render(<TaskFilter {...mockProps} />);
    
    const completedButton = screen.getByText(/Completed/).closest('button');
    const pendingButton = screen.getByText(/Pending/).closest('button');
    
    fireEvent.click(completedButton);
    expect(mockProps.setFilter).toHaveBeenCalledWith('completed');
    
    fireEvent.click(pendingButton);
    expect(mockProps.setFilter).toHaveBeenCalledWith('pending');
  });

  it('handles empty task list', () => {
    const emptyProps = { ...mockProps, tasks: [] };
    render(<TaskFilter {...emptyProps} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByTestId('all-count')).toHaveTextContent('0');
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0');
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0');
  });

  it('handles all completed tasks', () => {
    const allCompletedTasks = mockTasks.map(task => ({ ...task, completed: true }));
    const props = { ...mockProps, tasks: allCompletedTasks };
    render(<TaskFilter {...props} />);
    
    // All: 4, Completed: 4, Pending: 0
    expect(screen.getByTestId('all-count')).toHaveTextContent('4');
    expect(screen.getByTestId('completed-count')).toHaveTextContent('4');
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0');
  });

  it('handles all pending tasks', () => {
    const allPendingTasks = mockTasks.map(task => ({ ...task, completed: false }));
    const props = { ...mockProps, tasks: allPendingTasks };
    render(<TaskFilter {...props} />);
    
    // All: 4, Completed: 0, Pending: 4
    expect(screen.getByTestId('all-count')).toHaveTextContent('4');
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0');
    expect(screen.getByTestId('pending-count')).toHaveTextContent('4');
  });
});