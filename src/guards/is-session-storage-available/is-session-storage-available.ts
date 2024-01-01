const TEST_KEY = '__TEST_KEY__';

/**
 * Checks whether `sessionStorage` is available.
 *
 * @returns   Whether `sessionStorage` is available.
 */
export const isSessionStorageAvailable = (): boolean => {
	if (typeof sessionStorage === 'undefined') return false;

	try {
		sessionStorage.setItem(TEST_KEY, 'value');
		sessionStorage.removeItem(TEST_KEY);
		return true;
	} catch {
		return false;
	}
};
