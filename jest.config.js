require('dotenv').config({ path: './.env' });

module.exports = {
  // Specify directories where Jest should look for tests
  roots: ['<rootDir>/client/tests', '<rootDir>/server/tests'],
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // Add any other Jest configurations you need
};
