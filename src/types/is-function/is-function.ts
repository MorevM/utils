/**
 * Checks whether a given value is a function.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isFunction = (value: any): value is Function =>
	Object.prototype.toString.call(value) === '[object Function]';
