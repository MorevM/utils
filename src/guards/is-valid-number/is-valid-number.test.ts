import { isValidNumber } from './is-valid-number';

describe(isValidNumber, () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isValidNumber(1)).toBe(true);
	});

	it('Returns `true` if a given value is a fractional number', () => {
		expect(isValidNumber(1.2)).toBe(true);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isValidNumber(NaN)).toBe(false);
	});

	it('Returns `true` if a given value is `Infinity`', () => {
		expect(isValidNumber(Infinity)).toBe(true);
		expect(isValidNumber(-Infinity)).toBe(true);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isValidNumber('foo')).toBe(false);
	});
});
