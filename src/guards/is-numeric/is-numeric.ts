/**
 * Checks whether a given value is a valid number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid number
 */
export const isNumeric = (value: any): value is number =>
	typeof value === 'number' && !isNaN(value);
