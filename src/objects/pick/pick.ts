import type { PlainObject } from '../../types';

/**
 * Returns the new object containing only the specified keys.
 *
 * @param   obj    Original object.
 * @param   keys   Keys of original object to pick.
 *
 * @returns        New object containing only the specified keys.
 */
export const pick = <T extends PlainObject, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> =>
	Object.fromEntries(
		keys.filter((key) => key in obj)
			.map((key) => [key, obj[key]]),
	) as Pick<T, K>;
