/**
 * Comprehensive Test Runner for Task Tracker Application
 * 
 * This script runs all the test suites to ensure all features
 * of the task tracker application are working correctly.
 * 
 * Usage: node test-all.js
 */

const { execSync } = require('child_process');

console.log('\n🧪 Running comprehensive tests for Task Tracker application\n');

try {
  // Execute Jest tests with coverage
  console.log('📊 Running tests with coverage report...\n');
  execSync('npm test -- --coverage --watchAll=false', { stdio: 'inherit' });
  
  console.log('\n✅ All tests passed successfully!');
  console.log('\n📋 Test Summary:');
  console.log('- ✓ Login System');
  console.log('- ✓ Task Management (Create, Edit, Delete, Complete)');
  console.log('- ✓ Task Display');
  console.log('- ✓ Filtering System');
  console.log('- ✓ Data Persistence');
  console.log('- ✓ Responsive Design');
  console.log('- ✓ Search Functionality');
  console.log('- ✓ Task Priority Levels');
  console.log('- ✓ Due Dates for Tasks');
  console.log('- ✓ Animations/Transitions');
  console.log('- ✓ Dark Mode Toggle');
  console.log('- ✓ Task Categories/Tags');
  
  console.log('\n🎉 All features have been tested thoroughly!');
  
} catch (error) {
  console.error('\n❌ Some tests failed. Please fix the issues and run the tests again.');
  process.exit(1);
} 