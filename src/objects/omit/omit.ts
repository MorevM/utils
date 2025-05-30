import { isNullish } from '../../guards';

/**
 * Removes the specified keys from the given object and returns new object.
 *
 * @param   obj    Original object.
 * @param   keys   Keys of original object to remove.
 *
 * @returns        New object without specified keys.
 */
export const omit = <T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> =>
	Object.fromEntries(Object.entries(obj ?? {}).filter(([k]) => !keys.includes(k as K))) as Omit<T, K>;

/**
 * Removes the specified keys from the given object and returns the same object.
 * **MUTATES** the original object.
 *
 * @param   obj    Original object.
 * @param   keys   Keys of original object to remove.
 *
 * @returns        The mutated object without specified keys.
 */
export const omitMutable = <T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
	if (isNullish(obj)) return obj;

	for (const key of keys) {
		delete obj[key];
	}

	return obj as Omit<T, K>;
};
