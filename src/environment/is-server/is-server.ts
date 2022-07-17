/**
 * Checks if the code is running on the server side (outside the browser context)
 *
 * @returns   Whether a server environment is being used for execution
 */
export const isServer = () => typeof window === 'undefined';
