/**
 * Checks whether the application runs in testing mode.
 *
 * @returns   Whether the application runs in testing node.
 */
export const isTest = () =>
	process.env.NODE_ENV === 'test';
