/**
 * Checks whether a given value is a Promise.
 *
 * @param   value   The value being evaluated.
 *
 * @returns           Whether the value is Promise
 */
export const isPromise = (value: any): value is Promise<any> =>
	value instanceof Promise;
