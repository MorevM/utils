/**
 * Checks whether a given value is an object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is an Object.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
	Object.prototype.toString.call(value).includes('Object');
