/**
 * Checks whether a given value is a boolean.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is Boolean
 */
export const isBoolean = (value: unknown): value is boolean =>
	value === true || value === false;
