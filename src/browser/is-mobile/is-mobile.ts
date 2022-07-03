/**
 * Checks if a mobile browser is being used.
 *
 * @returns   Whether any mobile browser is being used.
 */
export const isMobile = (): boolean =>
	/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
