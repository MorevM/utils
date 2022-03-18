/**
 * Checks whether a given value is a Promise.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isPromise = (value: any): value is Promise<any> =>
	value instanceof Promise;
