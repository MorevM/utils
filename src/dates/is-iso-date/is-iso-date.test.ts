import { isIsoDate } from './is-iso-date';

describe('is-iso-date', () => {
	it('Returns `false` for any non-string input', () => {
		expect(isIsoDate(1)).toBe(false);
		expect(isIsoDate(new Date())).toBe(false);
		expect(isIsoDate(null)).toBe(false);
	});

	it('Returns `false` for invalid ISO string (by syntax)', () => {
		expect(isIsoDate('foo')).toBe(false); // Invalid string
		expect(isIsoDate('2024')).toBe(false); // No month and date
		expect(isIsoDate('2024-05')).toBe(false); // No date
		expect(isIsoDate('2024-05-32')).toBe(false); // Invalid date
		expect(isIsoDate('2024-05-aa')).toBe(false); // Invalid date format
		expect(isIsoDate('2024-13-30')).toBe(false); // Invalid month
		expect(isIsoDate('2024-aa-30')).toBe(false); // Invalid month format
		expect(isIsoDate('-024-13-30')).toBe(false); // Invalid year
		expect(isIsoDate('aaaa-13-30')).toBe(false); // Invalid year format
		expect(isIsoDate('2024-05-25T')).toBe(false); // Lacks time, but has a T symbol
		expect(isIsoDate('2024-05-25T00')).toBe(false); // No minutes
		expect(isIsoDate('2024-05-25T00:00')).toBe(false); // No seconds
		expect(isIsoDate('2024-05-25T00:00:70')).toBe(false); // Invalid number of seconds
		expect(isIsoDate('2024-05-25T00:00:ff')).toBe(false); // Invalid format of seconds
		expect(isIsoDate('2024-05-25T00:60:00')).toBe(false); // Invalid number of minutes
		expect(isIsoDate('2024-05-25T00:ff:00')).toBe(false); // Invalid format of minutes
		expect(isIsoDate('2024-05-25T25:00:00')).toBe(false); // Invalid number of hours
		expect(isIsoDate('2024-05-25Tff:00:00')).toBe(false); // Invalid format of hours
		expect(isIsoDate('2024-05-25Z23:00:00')).toBe(false); // Invalid delimiter between date and time
		expect(isIsoDate('2024-05-25T23:00:00.')).toBe(false); // Lacks milliseconds, but has a dot
		expect(isIsoDate('2024-05-25T23:00:00.9999')).toBe(false); // Invalid number of milliseconds
		expect(isIsoDate('2024-05-25T23:00:00.fff')).toBe(false); // Invalid format of milliseconds
		expect(isIsoDate('2024-05-25T23:00:00.999!00')).toBe(false); // Invalid timezone indication
		expect(isIsoDate('2024-05-25T23:00:00.999+0')).toBe(false); // Invalid offset (by number of digits)
		expect(isIsoDate('2024-05-25T23:00:00.999+000')).toBe(false); // Invalid offset (by number of digits)
		expect(isIsoDate('2024-05-25T23:00:00.999+00000')).toBe(false); // Invalid offset (by number of digits)
		expect(isIsoDate('2024-05-25T23:00:00.999+ff')).toBe(false); // Invalid offset (by format)
		expect(isIsoDate('2024-05-25T23:00:00.999+00.00')).toBe(false); // Invalid delimiter between minutes and hours in offset
		expect(isIsoDate('2024-05-25T23:00:00.999+25:00')).toBe(false); // Invalid offset hours
		expect(isIsoDate('2024-05-25T23:00:00.999+00:60')).toBe(false); // Invalid offset minutes
	});

	it('Returns `true` for any ISO date string in a valid syntax (not including date validity check in non-strict mode)', () => {
		expect(isIsoDate('2024-02-29')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999Z')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999+00')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999-00')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999+0000')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999+00:00')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999-0000')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999-00:00')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999+2359')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999+23:59')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999-23:59')).toBe(true);
		expect(isIsoDate('2024-02-29T23:00:00.999-23:59')).toBe(true);
	});

	it('Returns `false` with valid string by syntax, but not valid dates using `strict` option', () => {
		expect(isIsoDate('2023-02-29', true)).toBe(false); // Not leap year
		expect(isIsoDate('2023-04-31', true)).toBe(false); // April has only 30 days
	});
});
