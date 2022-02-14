/**
 * Removes the specified keys from the given object and returns new object.
 *
 * @param     {object}      obj    Original object.
 * @param     {...string}   keys   Keys of original object to remove.
 *
 * @returns   {boolean}
 */
export const omit = (obj: object, ...keys: string[]): object =>
	Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
