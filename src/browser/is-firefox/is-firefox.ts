/**
 * Checks if a Firefox browser is being used.
 *
 * @returns   {boolean}
 */
export const isFirefox = (): boolean =>
	!!navigator.userAgent.toLowerCase().match(/firefox./);
