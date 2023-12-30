/**
 * Checks whether a given value is `Blob`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `Blob`.
 */
export const isBlob = (value: unknown): value is Blob => {
	if (typeof Blob === 'undefined') return false;

	return value instanceof Blob
		|| Object.prototype.toString.call(value).includes('Blob');
};
