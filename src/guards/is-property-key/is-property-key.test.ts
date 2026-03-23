import { isPropertyKey } from './is-property-key';

describe(isPropertyKey, () => {
	it('Returns `true` if a given value is a string', () => {
		expect(isPropertyKey('foo')).toBe(true);
		expect(isPropertyKey('')).toBe(true);
	});

	it('Returns `true` if a given value is a number', () => {
		expect(isPropertyKey(0)).toBe(true);
		expect(isPropertyKey(1.2)).toBe(true);
		expect(isPropertyKey(-1)).toBe(true);
	});

	it('Returns `true` if a given value is a symbol', () => {
		expect(isPropertyKey(Symbol('foo'))).toBe(true);
	});

	it('Returns `true` if a given value is `NaN`', () => {
		expect(isPropertyKey(NaN)).toBe(true);
	});

	it('Returns `false` if a given value is not a property key', () => {
		expect(isPropertyKey(null)).toBe(false);
		expect(isPropertyKey(undefined)).toBe(false);
		expect(isPropertyKey(true)).toBe(false);
		expect(isPropertyKey({})).toBe(false);
		expect(isPropertyKey([])).toBe(false);
		expect(isPropertyKey(1n)).toBe(false);
	});
});
