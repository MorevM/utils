/**
 * Checks whether a given value is an integer number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is integer number
 */
export const isInteger = (value: unknown): value is number =>
	Number.isInteger(value);
