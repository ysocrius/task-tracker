import React from 'react';

function TaskFilter({ filter, setFilter, tasks }) {
  // Count tasks for each filter category
  const allCount = tasks.length;
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="task-filter">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        All <span className="count" data-testid="all-count">{allCount}</span>
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed <span className="count" data-testid="completed-count">{completedCount}</span>
      </button>
      <button
        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => setFilter('pending')}
      >
        Pending <span className="count" data-testid="pending-count">{pendingCount}</span>
      </button>
    </div>
  );
}

export default TaskFilter;
