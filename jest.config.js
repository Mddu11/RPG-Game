module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/js/weapons/**/*.js'],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
