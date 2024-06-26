// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest'
    },
    testEnvironment: 'jsdom'
  };