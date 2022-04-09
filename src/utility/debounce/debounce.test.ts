/* eslint-disable no-autofix/sonarjs/no-identical-functions */
import { debounce } from './debounce';

describe('debounce', () => {
	it('Delays a given function invoking until a given `delay` time have elapsed since the last time a function was invoked', async () => {
		let counter = 0;
		const debounced = debounce(() => counter++, 32, false);

		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		await expect(result()).resolves.toBe(2);
	});

	it('Invokes a given function once immediately after initialization', async () => {
		let counter = 0;
		const debounced = debounce(() => counter++, 32, true);

		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		await expect(result()).resolves.toBe(4);
	});

	it('Preserves the original context and arguments', async () => {
		let counter = 0;
		// @ts-expect-error -- Edge case of `this`
		const debounced = debounce(function (one, two) { counter += (this + one + two); }, 32, false).bind(100, 10, 1);

		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		await expect(result()).resolves.toBe(222);
	});
});
