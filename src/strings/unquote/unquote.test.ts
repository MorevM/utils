import { unquote } from './unquote';

describe('unquote', () => {
	it('Returns string as is if there are no quotes', () => {
		expect(unquote('')).toBe('');
		expect(unquote('test')).toBe('test');
	});

	it('Returns string without quotes and backticks', () => {
		expect(unquote('"test"')).toBe('test');
		expect(unquote("'test'")).toBe('test');
		expect(unquote('`test`')).toBe('test');
	});

	it('Returns string as is if different quotes used', () => {
		expect(unquote(`"test'`)).toBe(`"test'`);
	});
});
