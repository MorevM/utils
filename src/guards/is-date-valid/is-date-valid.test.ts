import { isDateValid } from './is-date-valid';

describe('is-date-valid', () => {
	it('Returns `true` if a given value is a valid `Date` object', () => {
		expect(isDateValid(new Date())).toBe(true);
	});

	it('Returns `false` if a given value is not a valid `Date` object', () => {
		expect(isDateValid(new Date('foo'))).toBe(false);
	});
});
