import { toDate } from './to-date';

// The utility function is actually a little wrapper under `parseDate` utility,
// so most tests are defined in `parseDate.test.ts`

// There is a static timezone offset defined in `utils/jest.global-setup.ts`.
const TIMEZONE_OFFSET_AS_HOURS = 3;
const hours = 20;

describe('to-date', () => {
	describe('Timestamp', () => {
		const timestamp = Date.UTC(2024, 4, 2, hours, 55, 55);

		it('Returns a Date object from a timestamp', () => {
			const date = toDate(timestamp);

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Returns a Date object in UTC mode', () => {
			const date = toDate(timestamp, { utc: true });

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});
	});

	describe('Date object itself', () => {
		const _date = new Date(2024, 4, 2, hours, 55, 55);

		it('Returns `null` for an invalid Date', () => {
			const date = toDate(new Date('foo'));

			expect(date).toBeNull();
		});

		it('Returns a Date object', () => {
			const date = toDate(_date, { utc: false });

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Returns a Date object in UTC mode', () => {
			const date = toDate(_date, { utc: true });

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});
	});

	describe('ISO notation', () => {
		const offsetAsHours = 4;
		const testString = `2024-05-02T${hours}:55:55`;
		const testStringWithOffset = `2024-05-02T${hours}:55:55-0${offsetAsHours}`;

		it('Properly converts a string to a Date object', () => {
			const date = toDate(testString);

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Properly converts a string to a Date object considering the date as UTC', () => {
			const date = toDate(testString, { utc: true });

			expect(date?.toISOString()).toBe(`2024-05-02T${hours}:55:55.000Z`);
			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS);
		});

		it('Properly converts a string to a Date object with defined offset', () => {
			const date = toDate(testStringWithOffset);

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - offsetAsHours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours - offsetAsHours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Properly converts a string to a Date object considering the date with defined offset as UTC', () => {
			const date = toDate(testStringWithOffset, { utc: true });

			expect(date?.toISOString()).toBe(`2024-05-02T${hours - offsetAsHours}:55:55.000Z`);
			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS - offsetAsHours);
		});
	});

	describe('Russian notation', () => {
		const testString = `02.05.2024 ${hours}:55:55`;

		it('Properly converts a string to a Date object', () => {
			const date = toDate(testString);

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Properly converts a string to a Date object considering the date as UTC', () => {
			const date = toDate(testString, { utc: true });

			expect(date?.toISOString()).toBe(`2024-05-02T${hours}:55:55.000Z`);
			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS);
		});
	});

	describe('British notation', () => {
		const testString = `05/02/2024 ${hours}:55:55`;

		it('Properly converts a string to a Date object', () => {
			const date = toDate(testString);

			expect(date?.toISOString())
				.toBe(`2024-05-02T${hours - TIMEZONE_OFFSET_AS_HOURS}:55:55.000Z`);

			expect(date?.getHours()).toBe(hours);
			expect(date?.getDate()).toBe(2);
			expect(date?.getMonth()).toBe(4);
		});

		it('Properly converts a string to a Date object considering the date as UTC', () => {
			const date = toDate(testString, { utc: true });

			expect(date?.toISOString()).toBe(`2024-05-02T${hours}:55:55.000Z`);
			expect(date?.getHours()).toBe(hours + TIMEZONE_OFFSET_AS_HOURS);
		});
	});
});
