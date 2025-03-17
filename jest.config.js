module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/dist/'],
    coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!<rootDir>/dist/**'
    ],
    coverageReporters: ['json', 'lcovonly', 'text', 'html'],
};