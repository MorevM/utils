import { isDev } from './is-dev';

describe('is-dev', () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it('Returns `true` if development mode is being used', () => {
		process.env.NODE_ENV = 'development';

		expect(isDev()).toBe(true);
	});

	it('Returns `false` if not a development mode is being used', () => {
		process.env.NODE_ENV = 'production';

		expect(isDev()).toBe(false);
	});
});
