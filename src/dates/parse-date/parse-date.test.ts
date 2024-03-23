import { parseDate } from './parse-date';

// There is a static timezone offset defined in `utils/vitest.global-setup.ts`.
const TIMEZONE_OFFSET_AS_HOURS = 3;

describe('parse-date', () => {
	describe('Timestamp', () => {
		const timestamp = Date.UTC(2024, 5, 25, 20, 30, 0);

		it('Returns the date tokens from a timestamp', () => {
			expect(parseDate(timestamp)).toStrictEqual({
				year: 2024, month: 5, day: 25,
				hours: 20, minutes: 30, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Returns the date tokens from a timestamp (using UTC)', () => {
			expect(parseDate(timestamp, { utc: true })).toStrictEqual({
				year: 2024, month: 5, day: 25,
				hours: 20 - TIMEZONE_OFFSET_AS_HOURS, minutes: 30, seconds: 0,
				milliseconds: 0,
			});
		});
	});

	describe('Date object itself', () => {
		it('Returns `null` for an invalid Date', () => {
			expect(parseDate(new Date('foo'))).toBeNull();
		});

		it('Returns the date tokens', () => {
			const date = new Date(2024, 2, 25, 23, 55, 55, 900);

			expect(parseDate(date)).toStrictEqual({
				year: 2024, month: 2, day: 25,
				hours: 23, minutes: 55, seconds: 55,
				milliseconds: 900,
			});
		});

		it('Returns the date tokens (as UTC)', () => {
			const date = new Date(2024, 2, 25, 23, 55, 55, 900);

			expect(parseDate(date, { utc: true })).toStrictEqual({
				year: 2024, month: 2, day: 25,
				hours: 23 - TIMEZONE_OFFSET_AS_HOURS, minutes: 55, seconds: 55,
				milliseconds: 900,
			});
		});
	});

	describe('ISO notation', () => {
		it('Can parse the date', () => {
			expect(parseDate('2024-05-25')).toStrictEqual({
				year: 2024, month: 4, day: 25,
				hours: 0, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date (input is treated as UTC)', () => {
			expect(parseDate('2024-05-25', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 24,
				hours: 24 - TIMEZONE_OFFSET_AS_HOURS, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time', () => {
			expect(parseDate('2024-05-22T22:33:03')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 3,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time (as UTC)', () => {
			expect(parseDate('2024-05-22T22:33:03', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 3,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time', () => {
			expect(parseDate('2024-05-22T22:33:44.999')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 44,
				milliseconds: 999,
			});
		});

		it('Can parse the date and long time (as UTC)', () => {
			expect(parseDate('2024-05-22T22:33:44.999', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 44,
				milliseconds: 999,
			});
		});

		it('Can parse the date and long time considering short offset', () => {
			expect(parseDate('2024-05-22 20:33:44+03')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 20 + 3, minutes: 33, seconds: 44,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time considering short offset (as UTC)', () => {
			expect(parseDate('2024-05-22 20:33:44+03', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 20 + 3 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 44,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time considering long offset', () => {
			expect(parseDate('2024-05-22 20:33:44+0320')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 20 + 3, minutes: 33 + 20, seconds: 44,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time considering longest offset (as UTC)', () => {
			expect(parseDate('2024-05-22 20:33:44+03:20', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 20 + 3 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33 + 20, seconds: 44,
				milliseconds: 0,
			});
		});

		it('Returns `null` for an invalid date', () => {
			expect(parseDate('foo')).toBeNull(); // Invalid string
			expect(parseDate('2024')).toBeNull(); // No month and date
			expect(parseDate('2024-05')).toBeNull(); // No date
			expect(parseDate('2024-05-32')).toBeNull(); // Invalid date
			expect(parseDate('2024-05-aa')).toBeNull(); // Invalid date format
			expect(parseDate('2024-13-30')).toBeNull(); // Invalid month
			expect(parseDate('2024-aa-30')).toBeNull(); // Invalid month format
			expect(parseDate('-024-13-30')).toBeNull(); // Invalid year
			expect(parseDate('aaaa-13-30')).toBeNull(); // Invalid year format
			expect(parseDate('2024-05-25T')).toBeNull(); // Lacks time, but has a T symbol
			expect(parseDate('2024-05-25T00')).toBeNull(); // No minutes
			expect(parseDate('2024-05-25T00:00')).toBeNull(); // No seconds
			expect(parseDate('2024-05-25T00:00:70')).toBeNull(); // Invalid number of seconds
			expect(parseDate('2024-05-25T00:00:ff')).toBeNull(); // Invalid format of seconds
			expect(parseDate('2024-05-25T00:60:00')).toBeNull(); // Invalid number of minutes
			expect(parseDate('2024-05-25T00:ff:00')).toBeNull(); // Invalid format of minutes
			expect(parseDate('2024-05-25T25:00:00')).toBeNull(); // Invalid number of hours
			expect(parseDate('2024-05-25Tff:00:00')).toBeNull(); // Invalid format of hours
			expect(parseDate('2024-05-25Z23:00:00')).toBeNull(); // Invalid delimiter between date and time
			expect(parseDate('2024-05-25T23:00:00.')).toBeNull(); // Lacks milliseconds, but has a dot
			expect(parseDate('2024-05-25T23:00:00.9999')).toBeNull(); // Invalid number of milliseconds
			expect(parseDate('2024-05-25T23:00:00.fff')).toBeNull(); // Invalid format of milliseconds
			expect(parseDate('2024-05-25T23:00:00.999!00')).toBeNull(); // Invalid timezone indication
			expect(parseDate('2024-05-25T23:00:00.999+0')).toBeNull(); // Invalid offset (by number of digits)
			expect(parseDate('2024-05-25T23:00:00.999+000')).toBeNull(); // Invalid offset (by number of digits)
			expect(parseDate('2024-05-25T23:00:00.999+00000')).toBeNull(); // Invalid offset (by number of digits)
			expect(parseDate('2024-05-25T23:00:00.999+ff')).toBeNull(); // Invalid offset (by format)
			expect(parseDate('2024-05-25T23:00:00.999+00.00')).toBeNull(); // Invalid delimiter between minutes and hours in offset
			expect(parseDate('2024-05-25T23:00:00.999+25:00')).toBeNull(); // Invalid offset hours
			expect(parseDate('2024-05-25T23:00:00.999+00:60')).toBeNull(); // Invalid offset minutes
		});
	});

	describe('Russian notation', () => {
		it('Can parse the date', () => {
			expect(parseDate('23.02.2024')).toStrictEqual({
				year: 2024, month: 1, day: 23,
				hours: 0, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date (input is treated as UTC)', () => {
			expect(parseDate('23.02.2024', { utc: true })).toStrictEqual({
				year: 2024, month: 1, day: 22,
				hours: 21, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time', () => {
			expect(parseDate('22.05.2024 22:33')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time (input is treated as UTC)', () => {
			expect(parseDate('22.05.2024 22:33', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time', () => {
			expect(parseDate('22.05.2024 22:33:44.999')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 44,
				milliseconds: 999,
			});
		});

		it('Can parse the date and long time (input is treated as UTC)', () => {
			expect(parseDate('22.05.2024 22:33:44.999', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 44,
				milliseconds: 999,
			});
		});

		it('Returns `null` for an invalid date', () => {
			expect(parseDate('29.02.2023')).toBeNull(); // Non-leap year
			expect(parseDate('31.04.2023')).toBeNull(); // Non-existed day of the month
			expect(parseDate('31.04.23ff')).toBeNull(); // Wrong characters in date
			expect(parseDate('31.04.2024 25:39:30')).toBeNull(); // Wrong hours
			expect(parseDate('31.04.2024 23:60:30')).toBeNull(); // Wrong minutes
			expect(parseDate('31.04.2024 23:33:99')).toBeNull(); // Wrong seconds
		});
	});

	describe('British notation', () => {
		it('Can parse the date', () => {
			expect(parseDate('05/25/2024')).toStrictEqual({
				year: 2024, month: 4, day: 25,
				hours: 0, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date (input is treated as UTC)', () => {
			expect(parseDate('05/25/2024', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 24,
				hours: 24 - TIMEZONE_OFFSET_AS_HOURS, minutes: 0, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time', () => {
			expect(parseDate('05/22/2024 22:33')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and short time (input is treated as UTC)', () => {
			expect(parseDate('05/22/2024 22:33', { utc: true })).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22 - TIMEZONE_OFFSET_AS_HOURS, minutes: 33, seconds: 0,
				milliseconds: 0,
			});
		});

		it('Can parse the date and long time', () => {
			expect(parseDate('05/22/2024 22:33:44.999')).toStrictEqual({
				year: 2024, month: 4, day: 22,
				hours: 22, minutes: 33, seconds: 44,
				milliseconds: 999,
			});
		});

		it('Returns `null` for an invalid date', () => {
			expect(parseDate('02/29/2023')).toBeNull(); // Non-leap year
			expect(parseDate('04/31/2023')).toBeNull(); // Non-existed day of the month
			expect(parseDate('04/31/23ff')).toBeNull(); // Wrong characters in date
			expect(parseDate('04/31/2024 25:39:30')).toBeNull(); // Wrong hours
			expect(parseDate('04/31/2024 23:60:30')).toBeNull(); // Wrong minutes
			expect(parseDate('04/31/2024 23:33:99')).toBeNull(); // Wrong seconds
		});
	});
});
