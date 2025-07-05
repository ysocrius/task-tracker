import React from 'react';

function TaskSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="task-search">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-search" 
          onClick={() => setSearchTerm('')}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default TaskSearch;
