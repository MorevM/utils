/**
 * Checks whether a given value is an DOM Element.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isElement = (value: any): value is Element =>
	value?.nodeType === 1;
