/**
 * Checks whether a given value is a node.
 *
 * @param   value   The value being evaluated.
 *
 * @deprecated    This function will change in the next major release, use `isElement` instead.
 *
 * @returns           Whether the value is DOM Element (TODO: Change when upgdade)
 */
export const isNode = (value: any): boolean =>
	value?.nodeType === 1;
