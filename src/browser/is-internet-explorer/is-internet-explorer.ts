/**
 * Checks if a legacy Internet Explorer browser (IE <= 11) is being used.
 *
 * @returns   Whether legacy IE browser (<= 11) is being used.
 */
export const isInternetExplorer = (): boolean =>
	!!navigator.userAgent.toLowerCase().match(/trident./);
