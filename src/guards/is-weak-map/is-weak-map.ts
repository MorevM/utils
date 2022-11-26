/**
 * Checks whether the given value is a WeakMap.
 * Note: this might not work when performed in a different window context.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the given value is a WeakMap or not.
 */
export const isWeakMap = (value: any): value is WeakMap<any, any> =>
	value instanceof WeakMap;
