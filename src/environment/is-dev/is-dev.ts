/**
 * Checks whether the application runs in development mode.
 *
 * @returns   Whether the application runs in development node.
 */
export const isDev = (): boolean | null => {
	if (typeof process === 'undefined') return null;

	return 	process.env.NODE_ENV === 'development';
};
