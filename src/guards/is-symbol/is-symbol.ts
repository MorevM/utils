/**
 * Checks whether a given value is a symbol.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is symbol.
 */
export const isSymbol = (value: unknown): value is symbol =>
	typeof value === 'symbol' || (typeof value === 'object' && Object.prototype.toString.call(value).includes('Symbol'));
