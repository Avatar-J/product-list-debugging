module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup.jest.ts"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "html", "js", "json"],
  testMatch: ["**/*.spec.ts"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["html"],
};
