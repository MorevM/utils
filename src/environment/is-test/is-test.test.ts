import { isTest } from './is-test';

describe('is-test', () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...OLD_ENV };
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it('Returns `true` if testing mode is being used', () => {
		process.env.NODE_ENV = 'test';

		expect(isTest()).toBe(true);
	});

	it('Returns `false` if not a testing mode is being used', () => {
		process.env.NODE_ENV = 'development';

		expect(isTest()).toBe(false);
	});
});
