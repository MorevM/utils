import { sleep } from '../../functions';
import { clamp } from '../../numbers';

/**
 * A wrapper for a promise, guaranteeing that it will not be fulfilled before `minTime` milliseconds.
 * Most often used for better UX, preventing the loader from flickering for 30-100ms, which looks weird.
 *
 * @param   promise   A promise for which you need to provide a minimum amount of time.
 * @param   minTime   Minimum time in which the result will be obtained.
 *
 * @returns           The result of fulfilling a given promise.
 */
export const minTimePromise = async <T>(promise: Promise<T>, minTime: number = 0) => {
	const startTime = Date.now();

	let errorTime: null | number = null;
	const result = await Promise.all([promise, sleep(minTime)]).catch((e) => {
		errorTime = Date.now();
		return [e];
	});

	if (errorTime) {
		await sleep(clamp(minTime - (errorTime - startTime), 0));
		// eslint-disable-next-line no-throw-literal -- If `errorTime` is truethy, then `result[0]` always instanceof Error
		throw result[0] as Error;
	}

	return result[0];
};
