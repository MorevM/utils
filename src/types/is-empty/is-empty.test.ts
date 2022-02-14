import { isEmpty } from './is-empty';

describe('is-empty', () => {
	it('Returns `true` if a given value is `null`', () => {
		expect(isEmpty(null)).toBe(true);
	});

	it('Returns `true` if a given value is `undefined`', () => {
		expect(isEmpty(undefined)).toBe(true);
	});

	it('Returns `true` if a given value is `false`', () => {
		expect(isEmpty(false)).toBe(true);
	});

	it('Returns `true` if a given value is `NaN`', () => {
		expect(isEmpty(NaN)).toBe(true);
	});

	it('Returns `true` if a given value is `0`', () => {
		expect(isEmpty(0)).toBe(true);
	});

	it('Returns `true` if a given value is empty string', () => {
		expect(isEmpty('')).toBe(true);
	});

	it('Returns `true` if a given value is empty array', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('Returns `true` if a given value is empty object', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('Returns `false` if a given value is a string representation of zero', () => {
		expect(isEmpty('0')).toBe(false);
	});

	it('Returns `false` if a given value is not empty', () => {
		expect(isEmpty('foo')).toBe(false);
	});
});
