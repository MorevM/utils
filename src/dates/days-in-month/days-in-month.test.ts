import { daysInMonth } from './days-in-month';

describe('daysInMonth', () => {
	beforeAll(() => {
		jest.useFakeTimers({ now: new Date(2020, 1, 1) });
	});

	it('Returns correct count of days in month with `year` passed', () => {
		expect(daysInMonth(0, 2022)).toBe(31);
		expect(daysInMonth(1, 2022)).toBe(28);
		expect(daysInMonth(2, 2022)).toBe(31);
		expect(daysInMonth(3, 2022)).toBe(30);
	});

	it('Returns correct count of days in month with no `year` passed', () => {
		jest.useFakeTimers({ now: new Date(2020, 1, 1) });

		expect(daysInMonth(0)).toBe(31);
		expect(daysInMonth(1)).toBe(29);

		jest.useRealTimers();
	});
});
