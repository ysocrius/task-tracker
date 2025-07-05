import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggleComplete, onEdit, filter = 'all' }) {
  // Filter tasks based on the filter prop
  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found. Add a new task to get started!</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
