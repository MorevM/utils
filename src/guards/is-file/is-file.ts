/**
 * Checks whether a given value is `File`.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `File`.
 */
export const isFile = (value: unknown): value is File => {
	if (typeof File === 'undefined') return false;

	return value instanceof File
		|| Object.prototype.toString.call(value).includes('File');
};
