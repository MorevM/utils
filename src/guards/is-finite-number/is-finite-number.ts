/**
 * Checks whether a given value is a finite number.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is finite number
 */
export const isFiniteNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value);
