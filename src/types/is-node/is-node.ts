/**
 * Checks whether a given value is a node.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @deprecated    This function will change in the next major release, use `isElement` instead.
 *
 * @returns   {boolean}
 */
export const isNode = (value: any): boolean =>
	value?.nodeType === 1;
