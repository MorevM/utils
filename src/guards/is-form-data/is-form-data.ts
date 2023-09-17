/**
 * Checks whether a given value is a FormData object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is FormData instance
 */
export const isFormData = (value: unknown): value is FormData => value instanceof FormData;
