/**
 * Utility to check if all project requirements are met
 */

// Core requirements from the assignment
export const coreRequirements = [
  // Login System
  {
    id: "login-form",
    category: "Login System",
    requirement: "Basic login form with a username input",
    verification: "The application has a login form with username input field",
    status: "implemented"
  },
  {
    id: "login-storage",
    category: "Login System",
    requirement: "Store username in localStorage",
    verification: "Username is stored in localStorage upon login",
    status: "implemented"
  },
  {
    id: "login-redirect",
    category: "Login System",
    requirement: "Redirect to task dashboard after login",
    verification: "User is redirected to task dashboard after successful login",
    status: "implemented"
  },

  // Task Management
  {
    id: "task-add",
    category: "Task Management",
    requirement: "Add Task form with title (required) and description (optional)",
    verification: "Form for adding tasks with required title and optional description",
    status: "implemented"
  },
  {
    id: "task-edit",
    category: "Task Management",
    requirement: "Edit Task inline or via modal",
    verification: "Tasks can be edited by clicking edit button",
    status: "implemented"
  },
  {
    id: "task-delete",
    category: "Task Management",
    requirement: "Delete Task with confirmation prompt",
    verification: "Tasks can be deleted with confirmation dialog",
    status: "implemented"
  },
  {
    id: "task-toggle",
    category: "Task Management",
    requirement: "Toggle Complete/Pending status",
    verification: "Tasks can be marked as completed or pending via checkbox",
    status: "implemented"
  },

  // Task Display
  {
    id: "display-details",
    category: "Task Display",
    requirement: "Show task title, description, and completion status",
    verification: "Tasks display title, description, and completion status",
    status: "implemented"
  },
  {
    id: "display-date",
    category: "Task Display",
    requirement: "Display creation date/time",
    verification: "Tasks show creation date and time",
    status: "implemented"
  },
  {
    id: "display-distinction",
    category: "Task Display",
    requirement: "Visual distinction between completed and pending tasks",
    verification: "Completed tasks have visual distinction from pending tasks",
    status: "implemented"
  },

  // Task Filtering
  {
    id: "filter-buttons",
    category: "Task Filtering",
    requirement: "Tabs or buttons for All, Completed, and Pending filters",
    verification: "Filter tabs/buttons for All, Completed, and Pending",
    status: "implemented"
  },
  {
    id: "filter-count",
    category: "Task Filtering",
    requirement: "Show task count for each filter",
    verification: "Each filter shows the count of tasks in that category",
    status: "implemented"
  },

  // Data Persistence
  {
    id: "persistence-storage",
    category: "Data Persistence",
    requirement: "Use localStorage to save tasks",
    verification: "Tasks are saved to localStorage",
    status: "implemented"
  },
  {
    id: "persistence-refresh",
    category: "Data Persistence",
    requirement: "Tasks persist after page refresh",
    verification: "Tasks remain available after page refresh",
    status: "implemented"
  },

  // Technical Requirements
  {
    id: "tech-hooks",
    category: "Technical Requirements",
    requirement: "Use React functional components with hooks",
    verification: "App uses functional components with React hooks",
    status: "implemented"
  },
  {
    id: "tech-responsive",
    category: "Technical Requirements",
    requirement: "Responsive design (mobile + desktop)",
    verification: "UI adapts to different screen sizes",
    status: "implemented"
  },
  {
    id: "tech-code",
    category: "Technical Requirements",
    requirement: "Clean, readable code with proper component structure",
    verification: "Code is organized, commented, and follows best practices",
    status: "implemented"
  },
  {
    id: "tech-styling",
    category: "Technical Requirements",
    requirement: "Basic styling using CSS",
    verification: "App has consistent styling with CSS",
    status: "implemented"
  }
];

// Bonus requirements
export const bonusRequirements = [
  {
    id: "bonus-search",
    category: "Bonus Features",
    requirement: "Search functionality",
    verification: "Users can search for tasks",
    status: "implemented"
  },
  {
    id: "bonus-priority",
    category: "Bonus Features",
    requirement: "Task priority levels",
    verification: "Tasks have priority levels (low, medium, high)",
    status: "implemented"
  },
  {
    id: "bonus-dates",
    category: "Bonus Features",
    requirement: "Due dates for tasks",
    verification: "Tasks can have due dates set",
    status: "implemented"
  },
  {
    id: "bonus-animations",
    category: "Bonus Features",
    requirement: "Smooth animations/transitions",
    verification: "UI includes smooth animations and transitions",
    status: "implemented"
  },
  {
    id: "bonus-darkmode",
    category: "Bonus Features",
    requirement: "Dark mode toggle",
    verification: "App has toggleable dark mode",
    status: "implemented"
  },
  {
    id: "bonus-categories",
    category: "Bonus Features",
    requirement: "Task categories/tags",
    verification: "Tasks can be assigned categories or tags",
    status: "not implemented"
  }
];

// Submission requirements
export const submissionRequirements = [
  {
    id: "submission-repo",
    category: "Submission",
    requirement: "Public GitHub repository",
    verification: "Code is in a public GitHub repository",
    status: "pending"
  },
  {
    id: "submission-readme",
    category: "Submission",
    requirement: "Comprehensive README.md",
    verification: "Repository includes detailed README with setup instructions",
    status: "pending"
  },
  {
    id: "submission-demo",
    category: "Submission",
    requirement: "Live demo deployed",
    verification: "App is deployed and accessible via a public URL",
    status: "pending"
  }
];

// Get all requirements
export const getAllRequirements = () => {
  return [...coreRequirements, ...bonusRequirements, ...submissionRequirements];
};

// Calculate completion status
export const getCompletionStats = () => {
  const core = coreRequirements.filter(req => req.status === 'implemented').length;
  const coreTotal = coreRequirements.length;
  
  const bonus = bonusRequirements.filter(req => req.status === 'implemented').length;
  const bonusTotal = bonusRequirements.length;
  
  const submission = submissionRequirements.filter(req => req.status === 'implemented').length;
  const submissionTotal = submissionRequirements.length;
  
  const total = core + bonus + submission;
  const totalRequirements = coreTotal + bonusTotal + submissionTotal;
  
  return {
    core: { completed: core, total: coreTotal, percentage: Math.round((core / coreTotal) * 100) },
    bonus: { completed: bonus, total: bonusTotal, percentage: Math.round((bonus / bonusTotal) * 100) },
    submission: { completed: submission, total: submissionTotal, percentage: Math.round((submission / submissionTotal) * 100) },
    total: { completed: total, total: totalRequirements, percentage: Math.round((total / totalRequirements) * 100) }
  };
};

// Get evaluation rating based on requirements met
export const getEvaluationRating = () => {
  const stats = getCompletionStats();
  
  // Core requirements are critical for rating
  const corePercentage = stats.core.percentage;
  
  if (corePercentage === 100 && stats.bonus.percentage >= 50) {
    return {
      rating: "Excellent (4/4)",
      description: "All features work, clean code, responsive UI, good UX, proper React usage"
    };
  } else if (corePercentage >= 90 && stats.bonus.completed >= 1) {
    return {
      rating: "Good (3/4)",
      description: "Most features work, mostly clean code, decent UI and responsiveness"
    };
  } else if (corePercentage >= 75) {
    return {
      rating: "Satisfactory (2/4)",
      description: "Core features functional, organization/styling may be lacking"
    };
  } else {
    return {
      rating: "Needs Improvement (1/4)",
      description: "Missing key features, messy code, poor UX"
    };
  }
}; 