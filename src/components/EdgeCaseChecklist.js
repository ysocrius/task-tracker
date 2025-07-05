import React from 'react';

function EdgeCaseChecklist({ onClose }) {
  const checklist = [
    {
      category: 'Form Input Validation',
      tests: [
        { name: 'Empty title submission', status: 'handled', handler: 'TaskForm validates required title' },
        { name: 'Title exceeds character limit', status: 'handled', handler: 'Character counter and input validation' },
        { name: 'Description exceeds character limit', status: 'handled', handler: 'Character counter and input validation' },
        { name: 'Special characters in input', status: 'handled', handler: 'sanitizeInput function cleans inputs' },
        { name: 'Past dates in due date picker', status: 'handled', handler: 'isValidFutureDate validation' },
      ]
    },
    {
      category: 'Data Storage',
      tests: [
        { name: 'localStorage not available', status: 'handled', handler: 'Storage availability check' },
        { name: 'Storage quota exceeded', status: 'handled', handler: 'Try/catch blocks in localStorage functions' },
        { name: 'Invalid data in storage', status: 'handled', handler: 'JSON parse in try/catch blocks' },
      ]
    },
    {
      category: 'User Authentication',
      tests: [
        { name: 'Empty username submission', status: 'handled', handler: 'Login form validation' },
        { name: 'Username too short/long', status: 'handled', handler: 'Login validation with length checks' },
        { name: 'Non-persistent login', status: 'handled', handler: 'localStorage with fallbacks' },
      ]
    },
    {
      category: 'UI State Handling',
      tests: [
        { name: 'No tasks to display', status: 'handled', handler: 'Conditional empty state in TaskList' },
        { name: 'No search results', status: 'handled', handler: 'Conditional rendering in TaskList' },
        { name: 'Task deletion confirmation', status: 'handled', handler: 'Confirmation dialog and animation' },
        { name: 'Concurrent form submissions', status: 'handled', handler: 'isSubmitting state in forms' },
      ]
    },
    {
      category: 'Error Handling',
      tests: [
        { name: 'Show validation errors', status: 'handled', handler: 'ErrorMessage component' },
        { name: 'Storage access errors', status: 'handled', handler: 'Try/catch in localStorage functions' },
        { name: 'Data processing errors', status: 'handled', handler: 'Try/catch in TaskForm submission' },
      ]
    }
  ];

  return (
    <div className="edge-case-checklist">
      <div className="checklist-header">
        <h2>Edge Case Testing Checklist</h2>
        <button onClick={onClose} className="close-btn" aria-label="Close checklist">&times;</button>
      </div>
      
      <div className="checklist-content">
        {checklist.map((category, idx) => (
          <div key={idx} className="checklist-category">
            <h3>{category.category}</h3>
            <ul>
              {category.tests.map((test, testIdx) => (
                <li key={testIdx} className={test.status}>
                  <span className="test-name">{test.name}</span>
                  <span className="status-badge">{test.status}</span>
                  <span className="handler-info">{test.handler}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdgeCaseChecklist; 