// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"], // 파일 위치를 알려줘야 테스트코드 작동 가능!
  setupFilesAfterEnv: ["./jest.setup.js"], // jest를 실행시킬 때 실행시킬 파일들 // 우리는 여기에 서버파일을 나둬서 자동으로 서버가 실행되게 하는거임!!
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
