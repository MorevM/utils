/**
 * Checks whether a given value is `null`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `null`.
 */
export const isNull = (value: unknown): value is null => value === null;
