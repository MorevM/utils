/**
 * Checks whether the current browser runs on a touch device.
 *
 * @returns   Whether any touch device is being used
 */
export const isTouch = (): boolean =>
	'ontouchstart' in window || !!(navigator as any)?.msMaxTouchPoints;
