/**
 * README Generator Utility
 * Generates a comprehensive README.md template based on implemented features
 */

import {
  coreRequirements, 
  bonusRequirements,
  getCompletionStats,
  getEvaluationRating
} from './requirementsChecker';

/**
 * Generates a README.md template for the project
 * @returns {string} README content in markdown format
 */
export const generateReadme = () => {
  const stats = getCompletionStats();
  const evaluation = getEvaluationRating();
  
  // Get implemented features
  const implementedCore = coreRequirements.filter(req => req.status === 'implemented');
  const implementedBonus = bonusRequirements.filter(req => req.status === 'implemented');
  
  return `# Personal Task Tracker

A responsive React application for managing personal tasks with a user-friendly interface.

## 📝 Overview

This task tracker application allows users to:
- Log in with a username
- Create, read, update, and delete tasks
- Filter tasks by status (All, Completed, Pending)
- Track task completion status
${implementedBonus.length > 0 ? `- Access bonus features like ${implementedBonus.map(b => b.requirement.toLowerCase()).join(', ')}` : ''}

## ✨ Features

### Core Features
${implementedCore.map(feature => `- **${feature.requirement}**: ${feature.verification}`).join('\n')}

${implementedBonus.length > 0 ? `### Bonus Features
${implementedBonus.map(feature => `- **${feature.requirement}**: ${feature.verification}`).join('\n')}` : ''}

## 🚀 Live Demo

[View Live Demo](#) <!-- Add your deployed app URL here -->

## 💻 Technologies Used

- React (Hooks, Context API)
- CSS3 for styling
- localStorage for data persistence
- Modern JavaScript (ES6+)

## 🛠️ Installation and Setup

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/task-tracker.git
\`\`\`

2. Navigate to the project directory
\`\`\`bash
cd task-tracker
\`\`\`

3. Install dependencies
\`\`\`bash
npm install
\`\`\`

4. Start the development server
\`\`\`bash
npm start
\`\`\`

5. Open your browser and visit \`http://localhost:3000\`

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across:
- Desktop computers
- Tablets
- Mobile phones

## 🔍 Code Organization

- **Components**: Modular React components for UI elements
- **Utilities**: Helper functions for data management
- **Styles**: CSS files for styling components
- **Hooks**: Custom React hooks for shared functionality

## 🧪 Testing

To run tests:
\`\`\`bash
npm test
\`\`\`

## 🔒 Edge Case Handling

- Input validation
- Error handling for data operations
- Graceful fallbacks for localStorage errors
- User feedback for actions

## 👤 User Authentication

The app uses a simple username-based authentication system with localStorage persistence.

## 🛡️ Project Evaluation

- **Rating**: ${evaluation.rating}
- **Status**: ${stats.core.percentage}% of core requirements implemented
- **Bonus Features**: ${stats.bonus.percentage}% of bonus features implemented

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgements

- React documentation
- Font Awesome for icons
- The open-source community for inspiration

## 👨‍💻 Author

Your Name - [Your GitHub Profile](#)
`;
};

/**
 * Generates just the features section for the README
 * @returns {string} Features section in markdown format
 */
export const generateFeaturesSection = () => {
  // Get implemented features
  const implementedCore = coreRequirements.filter(req => req.status === 'implemented');
  const implementedBonus = bonusRequirements.filter(req => req.status === 'implemented');
  
  return `## ✨ Features

### Core Features
${implementedCore.map(feature => `- **${feature.requirement}**: ${feature.verification}`).join('\n')}

${implementedBonus.length > 0 ? `### Bonus Features
${implementedBonus.map(feature => `- **${feature.requirement}**: ${feature.verification}`).join('\n')}` : ''}`;
}; 