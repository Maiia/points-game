import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig-base.json';

export default {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|html|js)$': 'jest-preset-angular',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/../',
    }),
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\.html$',
        },
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.spec.ts',
        '!src/main.ts',
        '!src/environments/**',
    ],
};
