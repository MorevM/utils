import { unquote } from './unquote';

describe('quote', () => {
	it('Returns string as is if there is no quotes', () => {
		expect(unquote('')).toBe('');
		expect(unquote('test')).toBe('test');
	});

	it('Returns string without quotes', () => {
		expect(unquote('"test"')).toBe('test');
		expect(unquote("'test'")).toBe('test');
	});

	it('Returns string as is if different quotes used', () => {
		expect(unquote(`"test'`)).toBe(`"test'`);
	});
});
