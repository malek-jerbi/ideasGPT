module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'backend'],
  moduleNameMapper: {
    '^openai$': '<rootDir>/__mocks__/openai.js',
    '^express-oauth2-jwt-bearer$':
      '<rootDir>/__mocks__/express-oauth2-jwt-bearer.js',
  },
}
