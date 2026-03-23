/* eslint-disable @typescript-eslint/no-deprecated, import-x/no-deprecated */
import { isNumeric } from './is-numeric';

describe(isNumeric, () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isNumeric(1)).toBe(true);
	});

	it('Returns `true` if a given value is a fractional number', () => {
		expect(isNumeric(1.2)).toBe(true);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isNumeric(NaN)).toBe(false);
	});

	it('Returns `true` if a given value is `Infinity`', () => {
		expect(isNumeric(Infinity)).toBe(true);
		expect(isNumeric(-Infinity)).toBe(true);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isNumeric('foo')).toBe(false);
	});
});
