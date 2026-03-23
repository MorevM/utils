/**
 * Checks whether a given value is a number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is number.
 */
export const isNumber = (value: unknown): value is number =>
	typeof value === 'number';
