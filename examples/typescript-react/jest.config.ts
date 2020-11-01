const settings = {
    setupFilesAfterEnv: ['<rootDir>/src/setUpTests.tsx'],
    testPathIgnorePatterns: [
        '<rootDir>/src/components/[A-Za-z]*/__tests__/([A-Za-z]*).testUtils.tsx'
    ],
    roots: ['<rootDir>/src'],
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    collectCoverageFrom: ['src/**/*.ts*'],
    moduleNameMapper: {
        '^.+\\.(css)$': 'identity-obj-proxy',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^constants/(.*)$': '<rootDir>/src/constants/$1'
    },
    globals: {
        'ts-jest': {
            tsConfig: false
        }
    }
};

export default settings;
