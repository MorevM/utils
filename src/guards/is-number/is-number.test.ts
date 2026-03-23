import { isNumber } from './is-number';

describe(isNumber, () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isNumber(1)).toBe(true);
	});

	it('Returns `true` if a given value is a fractional number', () => {
		expect(isNumber(1.2)).toBe(true);
	});

	it('Returns `true` if a given value is `NaN`', () => {
		expect(isNumber(NaN)).toBe(true);
	});

	it('Returns `true` if a given value is `Infinity`', () => {
		expect(isNumber(Infinity)).toBe(true);
		expect(isNumber(-Infinity)).toBe(true);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isNumber('foo')).toBe(false);
	});
});
