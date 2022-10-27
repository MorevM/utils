import { isNumeric } from '../is-numeric/is-numeric';

/**
 * Checks whether a given value is an integer number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is integer number
 */
export const isInteger = (value: any): value is number =>
	isNumeric(value) && (value % 1 === 0);
