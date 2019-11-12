module.exports = {
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/polyfills.ts',
    '!./src/**/*.animations.ts',
    '!./src/**/*.config.ts',
    '!./src/**/*.constants.ts',
    '!./src/**/*.enum.ts',
    '!./src/**/*.map.ts',
    '!./src/**/*.mock.ts',
    '!./src/**/*.model.ts',
    '!./src/**/*.module.ts',
    '!./src/**/*.routes.ts',
    '!./src/**/*.actions.ts',
    '!./src/**/*.state.ts',
    '!./src/**/index.ts',
    '!./src/**/main.ts',
    '!./src/environments/**'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coverageReporters: ['text', 'html'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  passWithNoTests: true,
  resolver: '@nrwl/jest/plugins/resolver',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  }
};
