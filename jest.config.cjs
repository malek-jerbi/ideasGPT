module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'backend', 'frontend'],
  moduleNameMapper: {
    '^openai$': '<rootDir>/__mocks__/openai.js',
    '^express-oauth2-jwt-bearer$':
      '<rootDir>/__mocks__/express-oauth2-jwt-bearer.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
