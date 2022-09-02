type PromiseController<T = undefined> = Promise<T> & {
	resolve: (value?: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
};

/**
 * Returns a Promise with `resolve` and `reject` methods itself
 *
 * @returns   Promise with extra `resolve` and `reject` methods
 */
export const promiseController = <T>(): PromiseController<T> => {
	let resolve;
	let reject;
	const promise = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	}) as PromiseController<T>;

	promise.resolve = resolve;
	promise.reject = reject;

	return promise;
};
