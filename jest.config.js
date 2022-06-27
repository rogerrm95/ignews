module.exports = {
    testPathIgnorePatterns: ["/node_modules", "/.next/", "/.vercel/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(jsx|js|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.spec.tsx",
        "!src/**/_app.tsx",
        "!src/**/_document.tsx",
    ],
    coverageReporters: ["lcov", "json"]
}

// Jest não entende Typescript, por isso o uso do Babel // transformIgnorePatterns