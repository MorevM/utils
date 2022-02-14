/**
 * Checks whether a given value is an instance of RegExp.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isRegExp = (value: any): boolean =>
	Object.prototype.toString.call(value) === '[object RegExp]';
