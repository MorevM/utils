/**
 * Checks whether a given value is a node.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isNode = (value: any): boolean =>
	value?.nodeType === 1;
