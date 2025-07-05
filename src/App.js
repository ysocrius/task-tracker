import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import EdgeCaseChecklist from './components/EdgeCaseChecklist';
import RequirementsChecker from './components/RequirementsChecker';
import { getTasks, getUsername, saveTasks } from './utils/localStorage';
import { useTheme } from './context/ThemeContext';
import './App.css';
import './styles/animations.css';
import './styles/darkMode.css';
import './styles/lightMode.css';
import './styles/filterButtons.css';
import './styles/buttons.css';
import './styles/taskActions.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');
  const [filter, setFilter] = useState('all');
  const { theme, toggleTheme, isDarkMode } = useTheme(); // Use ThemeContext
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequirements, setShowRequirements] = useState(false);
  const [showEdgeCases, setShowEdgeCases] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedUsername = getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
      setTasks(getTasks());
    }
    
    // Ensure assessment tools are hidden
    setShowRequirements(false);
    setShowEdgeCases(false);
  }, []);
  
  // Add task function
  const addTask = (taskData) => {
    // Generate a unique ID for the task
    const newTask = {
      id: Date.now().toString(),
      ...taskData
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  
  // Update task function
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  
  // Delete task function
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  
  // Toggle task completion
  const toggleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  
  // Get tasks filtered by search term
  const getSearchFilteredTasks = () => {
    if (searchTerm.trim() === '') {
      return tasks;
    }
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Check if this is a tag search (starts with #)
    if (searchLower.startsWith('#')) {
      const tagToSearch = searchLower.substring(1).trim(); // Remove the # character
      if (tagToSearch) {
        return tasks.filter(task => 
          task.tags && 
          task.tags.some(tag => tag.toLowerCase().includes(tagToSearch))
        );
      }
    }
    
    // Regular search through title, description, and tags
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchLower) || 
      (task.description && task.description.toLowerCase().includes(searchLower)) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  };
  
  // Get search-filtered tasks
  const searchFilteredTasks = getSearchFilteredTasks();
  
  // Log out user
  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
  };
  
  // Toggle requirements checker
  const toggleRequirements = () => {
    setShowRequirements(!showRequirements);
    setShowEdgeCases(false); // Close edge cases if open
  };
  
  // Toggle edge cases checker
  const toggleEdgeCases = () => {
    setShowEdgeCases(!showEdgeCases);
    setShowRequirements(false); // Close requirements if open
  };

  return (
    <Router basename="/task-tracker">
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              username ? (
                <Navigate to="/tasks" />
              ) : (
                <Login onLogin={setUsername} />
              )
            } 
          />
          <Route 
            path="/tasks" 
            element={
              username ? (
                <>
                  <Navbar 
                    username={username} 
                    onLogout={handleLogout}
                    onToggleRequirements={toggleRequirements}
                    onToggleEdgeCases={toggleEdgeCases}
                  />
                  
                  <div className="two-column-layout">
                    {/* Left Column - Fixed Task Form */}
                    <div className="left-column">
                      {/* Task Form */}
                      <TaskForm 
                        onAdd={addTask} 
                        onUpdate={updateTask}
                        taskToEdit={taskToEdit}
                        setTaskToEdit={setTaskToEdit}
                      />
                    </div>
                    
                    {/* Right Column - Scrollable Task List */}
                    <div className="right-column">
                      <div className="task-header">
                        <SearchBar 
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                        <div className="filter-buttons">
                          <button 
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                          >
                            All ({tasks.length})
                          </button>
                          <button 
                            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                          >
                            Pending ({tasks.filter(task => !task.completed).length})
                          </button>
                          <button 
                            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                          >
                            Completed ({tasks.filter(task => task.completed).length})
                          </button>
                        </div>
                      </div>
                      
                      <div className="task-list-container">
                        {/* Main Task List */}
                        <TaskList 
                          tasks={searchFilteredTasks} 
                          updateTask={updateTask}
                          filter={filter}
                          onDelete={deleteTask}
                          onToggleComplete={toggleTaskComplete}
                          onEdit={setTaskToEdit}
                        />
                      </div>
                    </div>
                    
                    {/* Requirements Checker (conditionally rendered) */}
                    {showRequirements && (
                      <RequirementsChecker 
                        tasks={tasks}
                        onClose={() => setShowRequirements(false)}
                      />
                    )}
                    
                    {/* Edge Case Checker (conditionally rendered) */}
                    {showEdgeCases && (
                      <EdgeCaseChecklist 
                        tasks={tasks}
                        onClose={() => setShowEdgeCases(false)}
                      />
                    )}
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
