import React from 'react';
import '../styles/Navbar.css';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ 
  username, 
  onLogout, 
  onToggleRequirements, 
  onToggleEdgeCases 
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Task Tracker</h1>
      </div>
      
      <div className="nav-controls">
        {/* Project verification tools - Hidden */}
        {/* <div className="project-tools">
          <button 
            className="btn btn-requirements" 
            onClick={onToggleRequirements}
            title="Check project requirements"
          >
            <i className="fas fa-check-square"></i> Requirements
          </button>
          
          <button 
            className="btn btn-edge-cases" 
            onClick={onToggleEdgeCases}
            title="Test edge cases"
          >
            <i className="fas fa-bug"></i> Edge Cases
          </button>
        </div> */}
        
        {/* User controls */}
        <div className="user-controls">
          <button 
            className="btn btn-theme" 
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
            <span className="theme-label">{isDarkMode ? "Dark" : "Light"}</span>
          </button>
          
          <div className="user-info">
            <span className="user-greeting">Hello, {username}!</span>
            <button 
              className="btn btn-logout" 
              onClick={onLogout}
              title="Logout"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 