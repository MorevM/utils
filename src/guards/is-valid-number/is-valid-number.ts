import { isNumber } from '../is-number/is-number';

/**
 * Checks whether a given value is a valid number,
 * excluding `NaN` but including `Infinity` and `-Infinity`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid number.
 */
export const isValidNumber = (value: unknown): value is number =>
	isNumber(value) && !Number.isNaN(value);
