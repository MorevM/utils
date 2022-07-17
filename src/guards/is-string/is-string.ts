/**
 * Checks whether a given value is a string.
 *
 * @param   value   The value being evaluated.
 *
 * @returns           Whether the value is String
 */
export const isString = (value: any): value is string =>
	Object.prototype.toString.call(value) === '[object String]';
