import { isPromise } from '../../guards';
import { minTimePromise } from './min-time-promise';

const error = new Error('Error message');

describe('min-time-promise', () => {
	it('Returns a Promise object that resolves correctly regardless of `minTime` argument', async () => {
		const testValue = 1;
		const result = minTimePromise(Promise.resolve(testValue));
		const result2 = minTimePromise(Promise.resolve(testValue), 500);

		expect(isPromise(result)).toBe(true);
		await expect(result).resolves.toBe(testValue);

		expect(isPromise(result2)).toBe(true);
		await expect(result2).resolves.toBe(testValue);
	});

	it('Does not resolve/reject until `minTime` timer expires', async () => {
		const minTime = 300;
		const startTime = Date.now();
		const promise = await minTimePromise(
			Promise.all([Promise.resolve(1), Promise.reject(error), Promise.resolve(2)]),
			minTime,
		).catch((e) => e);
		const endTime = Date.now();

		expect(promise).toBe(error);
		expect(endTime - startTime).toBeGreaterThanOrEqual(minTime);
	});

	it('Works correctly with inner `Promise.all`', async () => {
		const promiseWithReject = minTimePromise(
			Promise.all([Promise.resolve(1), Promise.reject(error), Promise.resolve(2)]),
		);
		const promiseWithResolve = minTimePromise(
			Promise.all([Promise.resolve(1), Promise.resolve(2)]),
			600,
		);

		await expect(promiseWithReject).rejects.toBe(error);
		await expect(promiseWithResolve).resolves.toStrictEqual([1, 2]);
	});

	it('Works correctly with inner `Promise.allSettled`', async () => {
		const promise = await minTimePromise(
			Promise.allSettled([Promise.resolve(1), Promise.reject(error), Promise.resolve(2)]),
			300,
		);

		expect(promise).toStrictEqual([
			{ status: 'fulfilled', value: 1 },
			{ status: 'rejected', reason: error },
			{ status: 'fulfilled', value: 2 },
		]);
	});

	it('Works correctly with inner `Promise.any`', async () => {
		const promise1 = Promise.reject(error);
		const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 1));
		const promise3 = new Promise((resolve) => setTimeout(resolve, 10000, 2));

		const promise = await minTimePromise(
			Promise.any([promise1, promise2, promise3]),
			300,
		);

		const promiseWithReject = await minTimePromise(
			Promise.any([promise1, new Promise((_, reject) => setTimeout(reject, 100, error))]),
			300,
		).catch((e) => e);

		expect(promise).toBe(1);
		expect(promiseWithReject).toBeInstanceOf(AggregateError);
	});

	it('Works correctly with inner `Promise.race`', async () => {
		const promise1 = Promise.reject(error);
		const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 1));
		const promise3 = new Promise((resolve) => setTimeout(resolve, 10000, 2));

		const promiseWithReject = await minTimePromise(
			Promise.race([promise1, promise2, promise3]),
			300,
		).catch((e) => e);

		const promiseWithResolve = await minTimePromise(
			Promise.race([promise2, promise3]),
			300,
		);

		expect(promiseWithReject).toBe(error);
		expect(promiseWithResolve).toBe(1);
	});
});
