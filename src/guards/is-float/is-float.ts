import { isFiniteNumber } from '../is-finite-number/is-finite-number';

/**
 * Checks whether a given value is a float number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is float number
 */
export const isFloat = (value: unknown): value is bigint =>
	isFiniteNumber(value) && (value % 1 !== 0);
