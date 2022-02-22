/**
 * Checks whether a given value is an array.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isArray = (value: any): value is any[] => Array.isArray(value);
