/**
 * Checks whether a given value is an object.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isObject = (value: any): boolean =>
	Object.prototype.toString.call(value).includes('Object');
