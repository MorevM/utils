/**
 * Checks whether the given value is a Map.
 * Note: this might not work when performed in a different window context.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the given value is a Map or not.
 */
export const isMap = (value: unknown): value is Map<any, any> =>
	value instanceof Map;
