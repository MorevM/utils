/**
 * Checks whether a given value is a valid number .
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isNumeric = (value: any) =>
	typeof value === 'number' && !isNaN(value);
