/**
 * Checks whether the application runs in production mode.
 *
 * @returns   Whether the application runs in production node.
 */
export const isProd = (): boolean | null => {
	if (typeof process === 'undefined') return null;

	return process.env.NODE_ENV === 'production';
};
