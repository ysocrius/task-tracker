import React, { useState } from 'react';
import { 
  coreRequirements, 
  bonusRequirements, 
  submissionRequirements,
  getCompletionStats,
  getEvaluationRating
} from '../utils/requirementsChecker';
import '../styles/RequirementsChecker.css';

const RequirementsChecker = () => {
  const [activeTab, setActiveTab] = useState('core');
  const stats = getCompletionStats();
  const evaluation = getEvaluationRating();

  // Get the requirements based on the active tab
  const getRequirements = () => {
    switch(activeTab) {
      case 'core':
        return coreRequirements;
      case 'bonus':
        return bonusRequirements;
      case 'submission':
        return submissionRequirements;
      case 'all':
        return [...coreRequirements, ...bonusRequirements, ...submissionRequirements];
      default:
        return coreRequirements;
    }
  };

  // Render a single requirement item
  const renderRequirement = (req) => {
    return (
      <div key={req.id} className={`requirement-item ${req.status}`}>
        <div className="requirement-header">
          <h4>{req.requirement}</h4>
          <span className={`status-badge ${req.status}`}>
            {req.status === 'implemented' ? '✓ Implemented' : 
             req.status === 'pending' ? '⏳ Pending' : '❌ Not Implemented'}
          </span>
        </div>
        <div className="requirement-details">
          <p><strong>Verification:</strong> {req.verification}</p>
        </div>
      </div>
    );
  };

  // Render progress bars
  const renderProgressBar = (section, data) => {
    return (
      <div className="progress-section">
        <div className="progress-header">
          <h4>{section}</h4>
          <span>{data.completed} / {data.total} ({data.percentage}%)</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{width: `${data.percentage}%`}}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="requirements-checker">
      <h2>Requirements Verification</h2>
      
      {/* Progress Summary */}
      <div className="requirements-summary">
        <div className="progress-stats">
          {renderProgressBar('Core Requirements', stats.core)}
          {renderProgressBar('Bonus Features', stats.bonus)}
          {renderProgressBar('Submission Requirements', stats.submission)}
          {renderProgressBar('Overall Completion', stats.total)}
        </div>

        <div className="evaluation-box">
          <h3>Project Evaluation</h3>
          <div className="rating">{evaluation.rating}</div>
          <p>{evaluation.description}</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="requirements-tabs">
        <button 
          className={activeTab === 'core' ? 'active' : ''}
          onClick={() => setActiveTab('core')}
        >
          Core ({stats.core.completed}/{stats.core.total})
        </button>
        <button 
          className={activeTab === 'bonus' ? 'active' : ''}
          onClick={() => setActiveTab('bonus')}
        >
          Bonus ({stats.bonus.completed}/{stats.bonus.total})
        </button>
        <button 
          className={activeTab === 'submission' ? 'active' : ''}
          onClick={() => setActiveTab('submission')}
        >
          Submission ({stats.submission.completed}/{stats.submission.total})
        </button>
        <button 
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Requirements
        </button>
      </div>
      
      {/* Requirements List */}
      <div className="requirements-list">
        {getRequirements().map(req => renderRequirement(req))}
      </div>

      {/* Export Options */}
      <div className="export-options">
        <button>Export as PDF</button>
        <button>Generate README Section</button>
      </div>
    </div>
  );
};

export default RequirementsChecker; 