/**
 * Checks whether a given value is a boolean.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isBoolean = (value: any): value is boolean =>
	value === true || value === false;
