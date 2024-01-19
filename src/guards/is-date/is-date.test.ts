import { isDate } from './is-date';

describe('is-date', () => {
	it('Returns `true` if a given value is a `Date` object (even invalid)', () => {
		expect(isDate(new Date())).toBe(true);
		expect(isDate(new Date('foo'))).toBe(true);
	});

	it('Returns `false` if a given value is not a `Date` object', () => {
		expect(isDate({})).toBe(false);
		expect(isDate('2011-05-27')).toBe(false);
	});

	it('Returns `false` if a given value is not a valid Date object using second argument', () => {
		expect(isDate(new Date('foo'), true)).toBe(false);
	});

	it('Returns `true` if a given value is a valid Date object using second argument', () => {
		expect(isDate(new Date(), true)).toBe(true);
	});
});
