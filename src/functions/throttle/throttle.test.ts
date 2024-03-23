/* eslint-disable no-autofix/sonarjs/no-identical-functions */
import { throttle } from './throttle';

describe('throttle', () => {
	beforeEach(() => vi.useFakeTimers());

	it('Throttles a callback function with no parameters except `delay`', async () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 3000);

		// 1 (leading) - 1
		// 2 - 3001
		// 3 - 6001
		// 4 - 9001
		// 5 (trailing) - 12001
		const interval = setInterval(throttled, 1);
		vi.advanceTimersByTime(10000);
		clearInterval(interval);
		vi.advanceTimersByTime(10000);

		expect(fn).toHaveBeenCalledTimes(5);
	});

	it('Throttles a callback function with no `leading`', async () => {
		const fn = vi.fn();
		const throttled = throttle(fn, { delay: 3000, leading: false });

		// (leading omitted)
		// 1 - 3001
		// 2 - 6001
		// 3 - 9001
		// 4 (trailing) - 12001
		const interval = setInterval(throttled, 1);
		vi.advanceTimersByTime(10000);
		clearInterval(interval);
		vi.advanceTimersByTime(10000);

		expect(fn).toHaveBeenCalledTimes(4);
	});

	it('Throttles a callback function with no `trailing`', async () => {
		const fn = vi.fn();
		const throttled = throttle(fn, { delay: 3000, trailing: false });

		// 1 (leading) - 1
		// 2 - 3001
		// 3 - 6001
		// 4 - 9001
		// (trailing omitted)
		const interval = setInterval(throttled, 1);
		vi.advanceTimersByTime(10000);
		clearInterval(interval);
		vi.advanceTimersByTime(10000);

		expect(fn).toHaveBeenCalledTimes(4);
	});

	it('Throttles a callback function with no `leading` and `trailing`', async () => {
		const fn = vi.fn();
		const throttled = throttle(fn, { delay: 3000, leading: false, trailing: false });

		// (leading omitted)
		// 1 - 3001
		// 2 - 6001
		// 3 - 9001
		// (trailing omitted)
		const interval = setInterval(throttled, 1);
		vi.advanceTimersByTime(10000);
		clearInterval(interval);
		vi.advanceTimersByTime(10000);

		expect(fn).toHaveBeenCalledTimes(3);
	});

	it('Can cancel invocation using `cancel` method', async () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 3000);

		setInterval(throttled, 1);
		throttled.cancel();
		vi.advanceTimersByTime(10000);

		expect(fn).toHaveBeenCalledTimes(0);
	});

	it('Preserves the original context and arguments', async () => {
		let counter = 0;

		// eslint-disable-next-line func-style -- `this` needed
		function fn(one: number, two: number) {
			// @ts-expect-error -- Edge case of `this`
			counter += (this + one + two);
		}

		const throttled = throttle(fn.bind(1, 1, 1), 3000);

		// 1 (leading)  - 1 + 1 + 1 = 3
		// 2            - 3 + 1 + 1 = 5
		// 3            - 5 + 1 + 1 = 8
		// 4            - 8 + 1 + 1 = 10
		// 5 (trailing) - 10 + 1 + 1 = 12
		setInterval(throttled, 1);
		vi.advanceTimersByTime(10000);

		expect(counter).toBe(12);
	});
});
