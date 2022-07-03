/**
 * Checks if a JSON representation of two objects are the same.
 *
 * WARN: Works only with JSON-compatible data.
 * For a real equality check use specialized packages.
 *
 * @deprecated This function will be removed in next major release. Use `deepEqual` instead
 *
 * @param   o1
 * @param   o2
 * @returns
 */
export const isObjectsEqualJSON = (o1: object, o2: object): boolean =>
	JSON.stringify(o1, Object.keys(o1).sort()) === JSON.stringify(o2, Object.keys(o2).sort()); //eslint-disable-line
