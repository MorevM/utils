import type { Config } from '@jest/types'; // eslint-disable-line node/no-extraneous-import

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'ts'],
	transform: {
		'\\.ts$': 'ts-jest',
	},
	testEnvironment: 'jsdom',
	restoreMocks: true,
	cacheDirectory: './tmp',
	collectCoverageFrom: ['./src/**/!(*.test).ts'],
	coveragePathIgnorePatterns: ['index.ts'],
	coverageReporters: ['lcov', 'text'],
	coverageProvider: 'v8',
	verbose: true,
};

export default config;
