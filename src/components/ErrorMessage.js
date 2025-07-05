import React, { useState, useEffect } from 'react';

function ErrorMessage({ message, onDismiss, autoDismiss = true }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when message changes
    setIsVisible(true);
    
    // Auto dismiss after 5 seconds if autoDismiss is true
    let dismissTimer;
    if (autoDismiss && message) {
      dismissTimer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) {
          setTimeout(onDismiss, 300); // Allow animation to complete
        }
      }, 5000);
    }
    
    return () => {
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, [message, autoDismiss, onDismiss]);

  if (!message || !isVisible) return null;

  return (
    <div className={`error-message ${isVisible ? 'show' : 'hide'} error-shake`}>
      <p>{message}</p>
      <button 
        className="dismiss-btn" 
        onClick={() => {
          setIsVisible(false);
          if (onDismiss) {
            setTimeout(onDismiss, 300); // Allow animation to complete
          }
        }}
        aria-label="Dismiss error"
      >
        &times;
      </button>
    </div>
  );
}

export default ErrorMessage; 