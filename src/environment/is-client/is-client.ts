/**
 * Checks if the code is running on the client side.
 *
 * @returns   Whether a browser is being used for execution
 */
export const isClient = () => typeof window !== 'undefined';
