/**
 * Checks whether a given value is a function.
 *
 * @param   value   The value being evaluated.
 *
 * @returns           Whether the value is Function
 */
export const isFunction = (value: any): value is Function =>
	Object.prototype.toString.call(value) === '[object Function]';
