import { isNumeric } from '../is-numeric/is-numeric';

/**
 * Checks whether a given value is an integer number.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isInteger = (value: any): boolean =>
	isNumeric(value) && (value % 1 === 0);
