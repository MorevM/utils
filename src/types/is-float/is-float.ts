import { isNumeric } from '../is-numeric/is-numeric';

/**
 * Checks whether a given value is a float number.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isFloat = (value: any): boolean =>
	isNumeric(value) && (value % 1 !== 0);
