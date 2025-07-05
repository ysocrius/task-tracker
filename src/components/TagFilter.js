import React from 'react';

function TagFilter({ tasks, selectedTag, onSelectTag }) {
  // Get unique tags from all tasks
  const getUniqueTags = () => {
    const allTags = tasks.reduce((tags, task) => {
      if (task.tags && task.tags.length) {
        return [...tags, ...task.tags];
      }
      return tags;
    }, []);
    
    // Return unique tags
    return [...new Set(allTags)].sort();
  };

  const uniqueTags = getUniqueTags();

  // If there are no tags yet, don't render the component
  if (uniqueTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <h3>Filter by Tag</h3>
      <div className="tag-list">
        <span 
          className={`tag-badge ${selectedTag === null ? 'active' : ''}`} 
          onClick={() => onSelectTag(null)}
        >
          All
        </span>
        {uniqueTags.map((tag, index) => (
          <span 
            key={index} 
            className={`tag-badge ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagFilter; 