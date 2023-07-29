/**
 * Checks whether a given value is a `Error`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a `Error`.
 */
export const isError = (value: unknown): value is Error =>
	value instanceof Error;
