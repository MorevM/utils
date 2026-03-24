/**
 * Checks whether a given value is a finite number,
 * excluding `NaN`, `Infinity` and `-Infinity`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a finite number.
 */
export const isFiniteNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value);
