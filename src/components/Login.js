import React, { useState } from 'react';
import { saveUsername } from '../utils/localStorage';
import { sanitizeInput } from '../utils/edgeCaseChecks';
import ErrorMessage from './ErrorMessage';
import { useTheme } from '../context/ThemeContext';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    // Validate input
    if (!trimmedUsername) {
      setError('Username is required');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (trimmedUsername.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize input to prevent XSS
      const sanitizedUsername = sanitizeInput(trimmedUsername);
      
      // Store username in localStorage
      const saved = saveUsername(sanitizedUsername);
      
      if (saved) {
        // Call the onLogin function to handle redirect
        onLogin(sanitizedUsername);
      } else {
        throw new Error('Unable to save username');
      }
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <h2>Login to Task Tracker</h2>
      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError('')}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username (3-20 characters)"
            className={error ? 'input-error' : ''}
            disabled={isSubmitting}
            required
          />
          {username && username.length > 0 && (
            <span className="character-counter">
              {username.length}/20
            </span>
          )}
        </div>
        <button 
          type="submit" 
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
