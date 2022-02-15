/**
 * Checks whether a given value is a FormData object.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isFormData = (value: any): boolean => value instanceof FormData;
