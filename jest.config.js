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
    }
}

// Jest não entende Typescript, por isso o uso do Babel // transformIgnorePatterns