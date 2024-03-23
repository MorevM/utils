import { isProd } from './is-prod';

describe('is-prod', () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...OLD_ENV };
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it('Returns `true` if production mode is being used', () => {
		process.env.NODE_ENV = 'production';

		expect(isProd()).toBe(true);
	});

	it('Returns `false` if not a production mode is being used', () => {
		process.env.NODE_ENV = 'development';

		expect(isProd()).toBe(false);
	});
});
