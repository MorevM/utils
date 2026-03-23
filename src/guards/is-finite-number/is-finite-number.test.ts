import { isFiniteNumber } from './is-finite-number';

describe(isFiniteNumber, () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isFiniteNumber(1)).toBe(true);
	});

	it('Returns `true` if a given value is a fractional number', () => {
		expect(isFiniteNumber(1.2)).toBe(true);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isFiniteNumber(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is `Infinity`', () => {
		expect(isFiniteNumber(Infinity)).toBe(false);
		expect(isFiniteNumber(-Infinity)).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isFiniteNumber('foo')).toBe(false);
	});
});
