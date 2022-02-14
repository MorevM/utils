/**
 * Checks if a legacy Internet Explorer browser (IE <= 11) is being used.
 *
 * @returns   {boolean}
 */
export const isInternetExplorer = (): boolean =>
	!!navigator.userAgent.toLowerCase().match(/trident./);
