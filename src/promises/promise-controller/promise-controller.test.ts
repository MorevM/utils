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

	it('Can resolve the promise via `resolve` method', async () => {
		const controlledPromise = promiseController();
		controlledPromise.resolve('foo');

		await expect(controlledPromise).resolves.toBe('foo');
	});

	it('Can reject the promise via `reject` method using message', async () => {
		const controlledPromise = promiseController();
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Doesn't matters in test
		controlledPromise.reject('reason');

		await expect(controlledPromise).rejects.toBe('reason');
	});

	it('Can reject the promise via `reject` method using Error object', async () => {
		const error = new Error('reason');
		const controlledPromise = promiseController();
		controlledPromise.reject(error);

		await expect(controlledPromise).rejects.toBe(error);
	});
});
