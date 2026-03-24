/**
 * Checks whether a given value has the `number` type,
 * including `NaN`, `Infinity` and `-Infinity`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value has the `number` type.
 */
export const isNumber = (value: unknown): value is number =>
	typeof value === 'number';
