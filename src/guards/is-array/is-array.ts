/**
 * Checks whether a given value is an array.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is Array
 */
export const isArray = (value: any): value is any[] => Array.isArray(value);
