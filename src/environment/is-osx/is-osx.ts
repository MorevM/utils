/**
 * Checks if an Apple device is being used.
 *
 * @returns   Whether any Apply device is being used
 */

export const isOSX = (): boolean => {
	const platform = (navigator as any).userAgentData?.platform
		|| navigator.platform // eslint-disable-line @typescript-eslint/no-deprecated
		|| '';
	return !!platform.match(/(ipad|iphone|ipod|mac)/i);
};
