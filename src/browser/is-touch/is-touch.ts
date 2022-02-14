/**
 * Checks whether the current browser runs on a touch device.
 *
 * @returns   {boolean}
 */
export const isTouch = (): boolean =>
	'ontouchstart' in window || !!(navigator as any)?.msMaxTouchPoints;
