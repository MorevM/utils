/**
 * Checks if an Apple device is being used.
 *
 * @returns   {boolean}
 */

export const isOSX = (): boolean => {
	const platform = (navigator as any).userAgentData?.platform
		|| navigator.platform
		|| '';
	return !!platform.match(/(mac|iphone|ipod|ipad)/i);
};
