/**
 * Checks whether a given value is an instance of RegExp.
 *
 * @param   value   The value being evaluated.
 *
 * @returns           Whether the value is RegExp
 */
export const isRegExp = (value: any): value is RegExp =>
	Object.prototype.toString.call(value) === '[object RegExp]';
