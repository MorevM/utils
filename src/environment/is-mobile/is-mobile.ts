/**
 * Checks if a mobile browser is being used.
 *
 * @returns   Whether any mobile browser is being used.
 */
export const isMobile = (): boolean =>
	/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent);
