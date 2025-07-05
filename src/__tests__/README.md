# Testing Framework for Personal Task Tracker

This directory contains comprehensive tests for the Personal Task Tracker application. We use React Testing Library and Jest for our testing framework.

## Test Structure

1. **App.test.js**: Tests the main application functionality, including:
   - Authentication flow
   - Task management (create, edit, delete)
   - Task filtering
   - Data persistence

2. **FeatureTests.test.js**: Tests specific features implemented in the app:
   - Search functionality
   - Task priority levels
   - Due dates for tasks
   - Dark mode toggle
   - Task categories/tags
   - Animations/transitions
   - Responsive design

3. **Component Tests**: Each component has its own test file in the `components/__tests__/` directory:
   - TaskForm.test.js
   - TaskItem.test.js
   - TaskList.test.js
   - TaskFilter.test.js
   - Login.test.js
   - TaskSearch.test.js

4. **Utils Tests**: Tests for utility functions in the `utils/__tests__/` directory:
   - localStorage.test.js

## Running Tests

To run all tests with coverage report:
```bash
npm run test:all
```

To run tests in watch mode:
```bash
npm test
```

## Manual Testing

In addition to automated tests, refer to the `TESTING.md` file in the root directory for a comprehensive manual testing checklist.

## Test Results

Test results and identified issues are documented in `TEST_RESULTS.md`. This document outlines any issues discovered during testing and provides recommendations for resolving them.

## Testing Approach

Our testing strategy follows these principles:

1. **Unit Testing**: Testing individual components in isolation
2. **Integration Testing**: Testing how components work together
3. **Feature Testing**: Testing complete features from a user perspective
4. **Snapshot Testing**: Ensuring UI components render as expected
5. **Edge Case Testing**: Identifying and testing boundary conditions and error states

By following this comprehensive testing approach, we ensure the application is robust, reliable, and provides a good user experience. 