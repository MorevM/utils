/**
 * Checks whether a given value is a date object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is Date object
 */
export const isDate = (value: any): value is Date =>
	Object.prototype.toString.call(value).includes('Date');
