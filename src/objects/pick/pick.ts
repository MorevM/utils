/**
 * Returns the new object containing only the specified keys.
 *
 * @param     {object}      obj    Original object.
 * @param     {...string}   keys   Keys of original object to pick.
 *
 * @returns   {boolean}
 */
export const pick = (obj: Record<string, any>, ...keys: string[]): object =>
	Object.fromEntries(
		keys.filter(key => key in obj)
			.map(key => [key, obj[key]]),
	);
