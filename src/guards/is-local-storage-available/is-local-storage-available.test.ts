import { isLocalStorageAvailable } from './is-local-storage-available';

describe('is-local-storage-available', () => {
	afterAll(() => { jest.restoreAllMocks(); });

	// This is ok in Node environment
	it('Returns `true` if `localStorage` is available', () => {
		expect(isLocalStorageAvailable()).toBe(true);
	});

	it('Returns `false` if `localStorage` is not available', () => {
		jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem')
			.mockImplementation(() => { throw new Error('QuotaExceededError'); });

		expect(isLocalStorageAvailable()).toBe(false);
	});
});
