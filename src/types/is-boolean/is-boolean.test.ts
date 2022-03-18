import { isBoolean } from './is-boolean';

describe('is-boolean', () => {
	it('Returns `true` if a given value is a boolean', () => {
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(isBoolean({})).toBe(false);
		expect(isBoolean(null)).toBe(false);
		expect(isBoolean(undefined)).toBe(false);
		expect(isBoolean(1)).toBe(false);
		expect(isBoolean(0)).toBe(false);
	});
});
