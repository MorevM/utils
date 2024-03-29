/**
 * Checks whether a given value is iterable.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `Iterable`.
 */
export const isIterable = (value: unknown): value is Iterable<any> =>
	// eslint-disable-next-line unicorn/new-for-builtins
	Symbol.iterator in Object(value);
