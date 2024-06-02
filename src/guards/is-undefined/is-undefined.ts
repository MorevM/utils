/**
 * Checks whether a given value is `undefined`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `undefined`.
 */
export const isUndefined = (value: unknown): value is undefined =>
	value === undefined;
