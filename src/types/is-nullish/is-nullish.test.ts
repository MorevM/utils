import { isNullish } from './is-nullish';

describe('is-nullish', () => {
	it('Returns `true` if a given value is `null`', () => {
		expect(isNullish(null)).toBe(true);
	});

	it('Returns `true` if a given value is `undefined`', () => {
		expect(isNullish(undefined)).toBe(true);
	});

	it('Returns `false` if a given value is `false`', () => {
		expect(isNullish(false)).toBe(false);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isNullish(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is `0`', () => {
		expect(isNullish(0)).toBe(false);
	});

	it('Returns `false` if a given value is empty string', () => {
		expect(isNullish('')).toBe(false);
	});

	it('Returns `false` if a given value is empty array', () => {
		expect(isNullish([])).toBe(false);
	});

	it('Returns `false` if a given value is empty object', () => {
		expect(isNullish({})).toBe(false);
	});

	it('Returns `false` if a given value is not empty', () => {
		expect(isNullish('foo')).toBe(false);
	});
});
