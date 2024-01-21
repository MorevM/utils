import { isLeapYear } from './is-leap-year';

describe('is-leap-year', () => {
	it('Returns `false` for an invalid input', () => {
		expect(isLeapYear('foo')).toBe(false);
		expect(isLeapYear(Math.PI)).toBe(false);
		expect(isLeapYear(new Date('foo'))).toBe(false);
	});

	it('Returns `false` for a valid input, but not leap year', () => {
		expect(isLeapYear(2001)).toBe(false);
		expect(isLeapYear('2005')).toBe(false);
		expect(isLeapYear(new Date(2009, 5))).toBe(false);
	});

	it('Returns `true` for a valid input representing a leap year', () => {
		expect(isLeapYear(2000)).toBe(true);
		expect(isLeapYear('2004')).toBe(true);
		expect(isLeapYear(new Date(2008, 5))).toBe(true);
	});
});
