/**
 * Checks if a Lighthouse user agent is being used. \
 * I condemn the use, but it is difficult to explain to customers.
 *
 * @returns   Whether the browser with Lighthouse user agent is being used.
 */

import { isClient } from '../is-client/is-client';

export const isLighthouse = (userAgent?: string): boolean => {
	if (!userAgent && isClient()) {
		userAgent = window.navigator.userAgent;
	}
	return ['Lighthouse', 'Page Speed', 'PageSpeed']
		.some(part => (userAgent ?? '').includes(part));
};
