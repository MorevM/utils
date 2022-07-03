/**
 * Removes the specified keys from the given object and returns new object.
 *
 * @param   obj    Original object.
 * @param   keys   Keys of original object to remove.
 *
 * @returns          New object without specified keys
 */
export const omit = (obj: object, ...keys: string[]): object =>
	Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
