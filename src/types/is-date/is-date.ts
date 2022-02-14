/**
 * Checks whether a given value is a date object.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isDate = (value: any): boolean =>
	Object.prototype.toString.call(value).includes('Date');
