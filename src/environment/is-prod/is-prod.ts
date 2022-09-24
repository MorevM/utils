/**
 * Checks whether the application runs in production mode.
 *
 * @returns   Whether the application runs in production node.
 */
export const isProd = () =>
	process.env.NODE_ENV === 'production';
