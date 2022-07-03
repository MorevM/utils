/**
 * Returns the new object containing only the specified keys.
 *
 * @param   obj    Original object.
 * @param   keys   Keys of original object to pick.
 *
 * @returns          New object containing only the specified keys.
 */
export const pick = (obj: Record<string, any>, ...keys: string[]): object =>
	Object.fromEntries(
		keys.filter(key => key in obj)
			.map(key => [key, obj[key]]),
	);
