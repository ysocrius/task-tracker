import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskSearch from '../TaskSearch';

describe('TaskSearch', () => {
  const mockSetSearchTerm = jest.fn();

  const defaultProps = {
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<TaskSearch {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('search-input');
  });

  it('displays current search term in input', () => {
    const props = { ...defaultProps, searchTerm: 'test search' };
    render(<TaskSearch {...props} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    expect(searchInput.value).toBe('test search');
  });

  it('calls setSearchTerm when input value changes', () => {
    render(<TaskSearch {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('new search');
  });

  it('shows clear button when search term is not empty', () => {
    const props = { ...defaultProps, searchTerm: 'test search' };
    render(<TaskSearch {...props} />);
    
    const clearButton = screen.getByText('×');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveClass('clear-search');
  });

  it('does not show clear button when search term is empty', () => {
    render(<TaskSearch {...defaultProps} />);
    
    const clearButton = screen.queryByText('×');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears search term when clear button is clicked', () => {
    const props = { ...defaultProps, searchTerm: 'test search' };
    render(<TaskSearch {...props} />);
    
    const clearButton = screen.getByText('×');
    fireEvent.click(clearButton);
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
  });

  it('handles empty string search term', () => {
    const props = { ...defaultProps, searchTerm: '' };
    render(<TaskSearch {...props} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    expect(searchInput.value).toBe('');
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('handles whitespace-only search term', () => {
    const props = { ...defaultProps, searchTerm: '   ' };
    render(<TaskSearch {...props} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    expect(searchInput.value).toBe('   ');
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('updates search term on every keystroke', () => {
    render(<TaskSearch {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    
    // Type each character
    fireEvent.change(searchInput, { target: { value: 't' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('t');
    
    fireEvent.change(searchInput, { target: { value: 'te' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('te');
    
    fireEvent.change(searchInput, { target: { value: 'tes' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('tes');
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
    
    expect(mockSetSearchTerm).toHaveBeenCalledTimes(4);
  });
});