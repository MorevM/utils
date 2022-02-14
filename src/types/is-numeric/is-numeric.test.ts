import { isNumeric } from './is-numeric';

describe('is-numeric', () => {
	it('Returns `true` if a given value is an integer number', () => {
		expect(isNumeric(1)).toBe(true);
	});

	it('Returns `true` if a given value is a fractional number', () => {
		expect(isNumeric(1.2)).toBe(true);
	});

	it('Returns `false` if a given value is `NaN`', () => {
		expect(isNumeric(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is not a number', () => {
		expect(isNumeric('foo')).toBe(false);
	});
});
