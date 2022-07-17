import { isDate } from './is-date';

describe('is-date', () => {
	it('Returns `true` if a given value is a `Date` object', () => {
		expect(isDate(new Date())).toBe(true);
	});

	it('Returns `false` if a given value is not a `Date` object', () => {
		expect(isDate({})).toBe(false);
	});
});
