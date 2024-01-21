import { isInteger } from './is-integer';

describe('is-integer', () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isInteger(1)).toBe(true);
		expect(isInteger(0)).toBe(true);
		expect(isInteger(-1)).toBe(true);
		expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
		expect(isInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
	});

	it('Returns `false` if a given value is a fractional number', () => {
		expect(isInteger(1.2)).toBe(false);
	});

	it('Returns `false` if a given value is `Infinity`', () => {
		expect(isInteger(Infinity)).toBe(false);
		expect(isInteger(-Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isInteger(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isInteger('foo')).toBe(false);
	});
});
