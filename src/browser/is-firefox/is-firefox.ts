/**
 * Checks if a Firefox browser is being used.
 *
 * @returns   Whether Firefox browser is being used.
 */
export const isFirefox = (): boolean =>
	!!navigator.userAgent.toLowerCase().match(/firefox./);
