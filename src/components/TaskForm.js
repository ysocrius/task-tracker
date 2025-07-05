import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import { validateTaskInput, sanitizeInput } from '../utils/edgeCaseChecks';
import { isValidFutureDate, getTodayString } from '../utils/dateUtils';

function TaskForm({ onAdd, taskToEdit, onUpdate, setTaskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);

  const TITLE_MAX_LENGTH = 100;
  const DESCRIPTION_MAX_LENGTH = 500;

  // Set form values when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'medium');
      setDueDate(taskToEdit.dueDate || '');
      setTags(taskToEdit.tags ? taskToEdit.tags.join(', ') : '');
      // Update character counts
      setTitleCharCount(taskToEdit.title ? taskToEdit.title.length : 0);
      setDescriptionCharCount(taskToEdit.description ? taskToEdit.description.length : 0);
    }
  }, [taskToEdit]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= TITLE_MAX_LENGTH) {
      setTitle(value);
      setTitleCharCount(value.length);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= DESCRIPTION_MAX_LENGTH) {
      setDescription(value);
      setDescriptionCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(title.trim());
    const sanitizedDescription = sanitizeInput(description.trim());
    
    if (!sanitizedTitle) {
      setError('Task title is required');
      return;
    }

    // Due date validation
    if (dueDate && !isValidFutureDate(dueDate)) {
      setError('Due date cannot be in the past');
      return;
    }
    
    // Process tags - split by comma, trim whitespace, and filter out empty tags
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    // Create base task data with required fields
    const taskData = {
      title: sanitizedTitle,
      description: sanitizedDescription,
    };

    // Only add optional fields if they have values or existed in the original task
    if (priority || (taskToEdit && taskToEdit.priority)) {
      taskData.priority = priority;
    }

    if (dueDate || (taskToEdit && taskToEdit.dueDate)) {
      taskData.dueDate = dueDate;
    }
    
    // Add tags if any exist
    if (tagArray.length > 0) {
      taskData.tags = tagArray;
    }

    // Add metadata fields
    if (taskToEdit) {
      taskData.completed = taskToEdit.completed;
      taskData.createdAt = taskToEdit.createdAt;
    } else {
      taskData.completed = false;
      taskData.createdAt = new Date().toISOString();
    }

    // Validate the task data
    const validationResult = validateTaskInput(taskData);
    if (!validationResult.isValid) {
      setError(validationResult.error);
      return;
    }

    try {
      if (taskToEdit) {
        // Create updated task by merging original task with new data
        // This preserves any fields we didn't explicitly modify
        const updatedTask = { ...taskToEdit, ...taskData };
        onUpdate(updatedTask);
        setTaskToEdit(null);
      } else {
        onAdd(taskData);
      }
      
      // Reset form
      resetForm();
    } catch (err) {
      setError(`Failed to ${taskToEdit ? 'update' : 'add'} task: ${err.message}`);
    }
  };

  const handleCancel = () => {
    setTaskToEdit(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags('');
    setError('');
    setTitleCharCount(0);
    setDescriptionCharCount(0);
  };

  // Determine character counter class
  const getTitleCounterClass = () => {
    if (titleCharCount >= TITLE_MAX_LENGTH) return 'character-counter limit-reached';
    if (titleCharCount >= TITLE_MAX_LENGTH * 0.8) return 'character-counter limit-near';
    return 'character-counter';
  };

  const getDescriptionCounterClass = () => {
    if (descriptionCharCount >= DESCRIPTION_MAX_LENGTH) return 'character-counter limit-reached';
    if (descriptionCharCount >= DESCRIPTION_MAX_LENGTH * 0.8) return 'character-counter limit-near';
    return 'character-counter';
  };

  return (
    <div className="task-form">
      <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError('')} 
          autoDismiss={true}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter task title"
            className={error && error.includes('title') ? 'input-error' : ''}
            required
          />
          <span className={getTitleCounterClass()}>
            {titleCharCount}/{TITLE_MAX_LENGTH}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter task description"
            className={error && error.includes('description') ? 'input-error' : ''}
            rows="3"
          />
          <span className={getDescriptionCounterClass()}>
            {descriptionCharCount}/{DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated, optional)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. work, personal, urgent"
            className={error && error.includes('tags') ? 'input-error' : ''}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date (optional)</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={getTodayString()}
              className={`date-picker ${error && error.includes('date') ? 'input-error' : ''}`}
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
          {taskToEdit && (
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
