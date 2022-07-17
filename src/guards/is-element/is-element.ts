/**
 * Checks whether a given value is a DOM Element.
 *
 * @param   value   The value being evaluated.
 *
 * @returns           Whether the value is DOM Element
 */
export const isElement = (value: any): value is Element =>
	value?.nodeType === 1;
