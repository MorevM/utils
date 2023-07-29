import { isNumeric } from '../is-numeric/is-numeric';

/**
 * Checks whether a given value is a float number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is float number
 */
export const isFloat = (value: any): value is number =>
	isNumeric(value) && (value % 1 !== 0);
