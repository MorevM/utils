/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { isPromise } from '../../guards';
import { promiseController } from './promise-controller';

describe('promise-controller', () => {
	it('Returns the Promise object', () => {
		const controlledPromise = promiseController();

		expect(isPromise(controlledPromise)).toBe(true);
	});

	it('Has the `resolve` and `reject` properties', () => {
		const controlledPromise = promiseController();

		expect(controlledPromise.resolve).toBeInstanceOf(Function);
		expect(controlledPromise.reject).toBeInstanceOf(Function);
	});

	it('Can resolve the promise via `resolve` method', () => {
		const controlledPromise = promiseController();
		controlledPromise.resolve('foo');

		expect(controlledPromise).resolves.toBe('foo');
	});

	it('Can reject the promise via `reject` method using message', () => {
		const controlledPromise = promiseController();
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Doesn't matters in test
		controlledPromise.reject('reason');

		expect(controlledPromise).rejects.toBe('reason');
	});

	it('Can reject the promise via `reject` method using Error object', () => {
		const error = new Error('reason');
		const controlledPromise = promiseController();
		controlledPromise.reject(error);

		expect(controlledPromise).rejects.toBe(error);
	});
});
