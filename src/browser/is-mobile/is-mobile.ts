/**
 * Checks if a mobile browser is being used.
 *
 * @returns   {boolean}
 */
export const isMobile = (): boolean =>
	/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
