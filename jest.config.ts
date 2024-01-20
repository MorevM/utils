// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	setupFilesAfterEnv: ['./jest.setup.ts'],
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
