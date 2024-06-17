require('dotenv').config({ path: './.env.test' });

module.exports = {
  roots: ['<rootDir>/server/tests'],
  testEnvironment: 'node',
  clearMocks: true,
  verbose: true,
};




