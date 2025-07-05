import React, { useState } from 'react';
import { formatDate, formatDueDate, getDueDateStatus } from '../utils/dateUtils';

function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      // Wait for animation to complete before actually deleting
      setTimeout(() => {
        onDelete(task.id);
      }, 300); // Match this with the CSS animation duration
    }
  };

  // Get the appropriate class for the priority badge
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      case 'medium':
      default:
        return 'priority-medium';
    }
  };

  const dueStatus = getDueDateStatus(task.dueDate);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="title-priority">
            <h3>{task.title}</h3>
            <span className={`priority-badge ${getPriorityClass(task.priority || 'medium')}`}>
              {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
            </span>
          </div>
          <div className="task-dates">
            <div className="task-date">
              Created: {formatDate(task.createdAt)}
            </div>
            {task.dueDate && (
              <div className={`task-due-date ${dueStatus}`}>
                Due: {formatDueDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        {task.tags && task.tags.length > 0 && (
          <div className="task-tags">
            {task.tags.map((tag, index) => (
              <span key={index} className="tag-badge">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="task-actions">
        <div className="task-actions-top">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <span className="checkmark"></span>
            {task.completed ? 'Completed' : 'Mark Complete'}
          </label>
        </div>
        <div className="task-buttons">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
