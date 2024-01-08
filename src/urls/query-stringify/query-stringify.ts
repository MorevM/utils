import { isPlainObject, isArray, isEmpty } from '../../guards';
import { tsObject } from '../../objects';
import type { PlainObject } from '../../types';

/**
 * Stringify an object for use in a query string.
 *
 * @param   object   An object to stringify.
 * @param   prefix   A prefix for root element.
 *
 * @returns          Query string built from the object.
 */
export const queryStringify = (object: PlainObject | undefined, prefix?: string) => {
	if (isEmpty(object)) return '';

	return tsObject.entries(object).reduce<string[]>((acc, [key, value]) => {
		const encodedKey = encodeURIComponent(key);
		const pairKey = prefix ? `${prefix}[${encodedKey}]` : encodedKey;
		const pair = isPlainObject(value) || isArray(value)
			? queryStringify(value, pairKey)
			: `${pairKey}=${encodeURIComponent(value)}`;

		acc.push(pair);
		return acc;
	}, []).filter(Boolean).join('&');
};
