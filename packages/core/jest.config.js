module.exports = {
  rootDir: __dirname,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^@shaval/core$': '<rootDir>index.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/test-d', '<rootDir>/dist'],
  transform: {
    '\\.tsx?$': '../../jest.transform.cjs',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts?(x)', '<rootDir>/e2e.spec.ts?(x)'],
  reporters: [
    '@jest/reporters/build/SummaryReporter.js',
    ['jest-silent-reporter', { useDots: true, showWarnings: true }],
  ],
}
