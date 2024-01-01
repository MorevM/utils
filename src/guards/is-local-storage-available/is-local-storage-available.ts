const TEST_KEY = '__TEST_KEY__';

/**
 * Checks whether `localStorage` is available.
 *
 * @returns   Whether `localStorage` is available.
 */
export const isLocalStorageAvailable = (): boolean => {
	if (typeof localStorage === 'undefined') return false;

	try {
		localStorage.setItem(TEST_KEY, 'value');
		localStorage.removeItem(TEST_KEY);
		return true;
	} catch {
		return false;
	}
};
