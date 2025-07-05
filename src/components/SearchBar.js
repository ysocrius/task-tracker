import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks or #tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowHint(true)}
          onBlur={() => setTimeout(() => setShowHint(false), 200)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {showHint && (
        <div className="search-hint">
          <strong>#tag</strong> for tag search
        </div>
      )}
    </div>
  );
}

export default SearchBar; 