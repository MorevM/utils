import { isClient } from '../is-client/is-client';

/**
 * Checks if a Lighthouse user agent is being used. \
 * I condemn the use, but it is difficult to explain to customers.
 *
 * @deprecated
 * `Lighthouse' does not include this data in `userAgent' since January 26, 2023. \
 * The function is now useless - it will always return `false`.
 * Related PR: https://github.com/GoogleChrome/lighthouse/pull/14384
 *
 * @param   userAgent   `userAgent` header.
 *
 * @returns             Whether the browser with Lighthouse user agent is being used.
 */
export const isLighthouse = (userAgent?: string): boolean => {
	if (!userAgent && isClient()) {
		userAgent = window.navigator.userAgent;
	}
	return ['Lighthouse', 'Page Speed', 'PageSpeed']
		.some((part) => (userAgent ?? '').includes(part));
};
