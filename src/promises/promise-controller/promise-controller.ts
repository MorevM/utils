type PromiseController<T = undefined> = Promise<T> & {
	resolve: (value?: T | PromiseLike<T>) => void;
	reject: (reason?: unknown) => void;
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

	promise.resolve = resolve as unknown as PromiseController<T>['resolve'];
	promise.reject = reject as unknown as PromiseController<T>['reject'];

	return promise;
};
