import { isFloat } from './is-float';

describe('is-float', () => {
	it('Returns `true` if a given value is a fractional number', () => {
		expect(isFloat(1.2)).toBe(true);
	});

	it('Returns `false` if a given value is an integer number', () => {
		expect(isFloat(1)).toBe(false);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isFloat(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isFloat('foo')).toBe(false);
	});
});
