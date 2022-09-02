/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { isPromise } from '../../guards';
import { promiseController } from './promise-controller';

describe('create-controlled-promise', () => {
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

	it('Can reject the promise via `reject` method', () => {
		const controlledPromise = promiseController();
		controlledPromise.reject('reason');

		expect(controlledPromise).rejects.toBe('reason');
	});
});
