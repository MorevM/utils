import { isDate } from '../../guards';
import { randomDate } from './random-date';

const BIRTHDATE = new Date(1994, 5, 11); // <-- That's mine ^^
const DEATHDATE = new Date(2094, 5, 11); // <-- Pretty optimistic

describe('random-date', () => {
	describe('Negative scenarios', () => {
		it('Replaces invalid arguments with defaults and returns a Date', { repeats: 1000 }, () => {
			const date = randomDate(
				Math.random() > .5 ? new Date('foo') : null,
				Math.random() > .5 ? new Date('foo') : null,
			);

			expect(isDate(date, true)).toBe(true);
			expect(date).toBeAfter(new Date(0));
			expect(date).toBeBefore(new Date());
		});

		it('Replaces the first invalid / nulled argument with default and returns a Date', { repeats: 1000 }, () => {
			const date = randomDate(Math.random() > .5 ? new Date('foo') : null, new Date(BIRTHDATE));

			expect(isDate(date, true)).toBe(true);
			expect(date).toBeAfter(new Date(0));
			expect(date).toBeBefore(BIRTHDATE);
		});

		it('Replaces the second invalid / nulled argument with default and returns a Date', { repeats: 1000 }, () => {
			const date = randomDate(new Date(BIRTHDATE), Math.random() > .5 ? new Date('foo') : null);

			expect(isDate(date, true)).toBe(true);
			expect(date).toBeAfter(BIRTHDATE);
			expect(date).toBeBefore(new Date());
		});

		describe('time (as tuple)', () => {
			it('Sets a closest time for a random date in case of invalid tuple passed in (upper bound)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [24, 60, 60, 100] });

				expect(date.getHours()).toBe(23);
				expect(date.getMinutes()).toBe(59);
				expect(date.getSeconds()).toBe(59);
				expect(date.getMilliseconds()).toBe(100);
			});

			it('Sets a closest time for a random date in case of invalid tuple passed in (lower bound)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [-1, -1, 42, -1] });

				expect(date.getHours()).toBe(0);
				expect(date.getMinutes()).toBe(0);
				expect(date.getSeconds()).toBe(42);
				expect(date.getMilliseconds()).toBe(0);
			});
		});

		describe('time (as string)', () => {
			it('Sets a closest time for a random date in case of invalid string passed in (upper bound)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '25:99:30.1000' });

				expect(date.getHours()).toBe(23);
				expect(date.getMinutes()).toBe(59);
				expect(date.getSeconds()).toBe(30);
				expect(date.getMilliseconds()).toBe(999);
			});

			it('Sets a closest time for a random date in case of invalid string passed in (lower bound)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '-1:-1:42.-100' });

				expect(date.getHours()).toBe(0);
				expect(date.getMinutes()).toBe(0);
				expect(date.getSeconds()).toBe(42);
				expect(date.getMilliseconds()).toBe(0);
			});

			it('Omits an invalid `time` arguments', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: 'foo:55:42:bar.123' });

				expect(date.getHours()).toBe(0);
				expect(date.getMinutes()).toBe(55);
				expect(date.getSeconds()).toBe(42);
				expect(date.getMilliseconds()).toBe(123);
			});
		});

		it('Works propertly if `start` and `end` dates are equal', { repeats: 1000 }, () => {
			const date = randomDate(BIRTHDATE, BIRTHDATE);

			expect(isDate(date, true)).toBe(true);
			expect(date.getTime()).toBeCloseTo(BIRTHDATE.getTime());
		});
	});

	describe('Positive scenarios', () => {
		it('Returns a random date between `start` and `end` dates', { repeats: 1000 }, () => {
			const date = randomDate(BIRTHDATE, DEATHDATE);

			expect(isDate(date, true)).toBe(true);
			expect(date).toBeAfter(BIRTHDATE);
			expect(date).toBeBefore(DEATHDATE);
		});

		describe('time (as tuple)', () => {
			it('Sets a time for a random date using tuple notation (only hours)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [18] });

				expect(date.getHours()).toBe(18);
			});

			it('Sets a time for a random date using tuple notation (hours and minutes)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [18, 2] });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
			});

			it('Sets a time for a random date using tuple notation (hours, minutes, seconds)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [18, 2, 30] });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
				expect(date.getSeconds()).toBe(30);
			});

			it('Sets a time for a random date using tuple notation (hours, minutes, seconds, milliseconds)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: [18, 2, 30, 666] });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
				expect(date.getSeconds()).toBe(30);
				expect(date.getMilliseconds()).toBe(666);
			});
		});

		describe('time (as string)', () => {
			it('Sets a time for a random date using string notation (only hours)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '18' });

				expect(date.getHours()).toBe(18);
			});

			it('Sets a time for a random date using tuple notation (hours and minutes)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '18:02' });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
			});

			it('Sets a time for a random date using tuple notation (hours, minutes, seconds)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '18:02:30' });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
				expect(date.getSeconds()).toBe(30);
			});

			it('Sets a time for a random date using tuple notation (hours, minutes, seconds, milliseconds)', () => {
				const date = randomDate(BIRTHDATE, DEATHDATE, { time: '18:02:30.666' });

				expect(date.getHours()).toBe(18);
				expect(date.getMinutes()).toBe(2);
				expect(date.getSeconds()).toBe(30);
				expect(date.getMilliseconds()).toBe(666);
			});
		});
	});
});
