/**
 * Checks whether a given value is a DOM Element.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isElement = (value: any): value is Element =>
	value?.nodeType === 1;
