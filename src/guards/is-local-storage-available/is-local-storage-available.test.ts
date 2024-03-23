import { isLocalStorageAvailable } from './is-local-storage-available';

describe('is-local-storage-available', () => {
	afterAll(() => { vi.restoreAllMocks(); });

	// This is ok in Node environment
	it('Returns `true` if `localStorage` is available', () => {
		expect(isLocalStorageAvailable()).toBe(true);
	});

	it('Returns `false` if `localStorage` is not available', () => {
		vi.spyOn(Object.getPrototypeOf(localStorage), 'setItem')
			.mockImplementation(() => { throw new Error('QuotaExceededError'); });

		expect(isLocalStorageAvailable()).toBe(false);
	});
});
