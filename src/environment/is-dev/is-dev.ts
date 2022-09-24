/**
 * Checks whether the application runs in development mode.
 *
 * @returns   Whether the application runs in development node.
 */
export const isDev = () =>
	process.env.NODE_ENV === 'development';
