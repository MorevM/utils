/**
 * Checks whether a given value is an object.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isObject = (value: any): value is Record<string, unknown> =>
	Object.prototype.toString.call(value).includes('Object');
