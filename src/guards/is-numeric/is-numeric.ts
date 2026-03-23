/**
 * Checks whether a given value is a valid number.
 *
 * @deprecated
 * This function will be removed in the next major release. \
 * Use `isNumber` or `isFiniteNumber` instead depending on desired semantics.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid number
 */
export const isNumeric = (value: unknown): value is number =>
	typeof value === 'number' && !isNaN(value);
