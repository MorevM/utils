import { isSessionStorageAvailable } from './is-session-storage-available';

describe('is-session-storage-available', () => {
	afterAll(() => { vi.restoreAllMocks(); });

	// This is ok in Node environment
	it('Returns `true` if `sessionStorage` is available', () => {
		expect(isSessionStorageAvailable()).toBe(true);
	});

	it('Returns `false` if `sessionStorage` is not available', () => {
		vi.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem')
			.mockImplementation(() => { throw new Error('QuotaExceededError'); });

		expect(isSessionStorageAvailable()).toBe(false);
	});
});
