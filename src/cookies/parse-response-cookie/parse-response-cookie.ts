// Just a custom implementation of https://github.com/nfriedly/set-cookie-parser/
// written in a modern syntax with TS types included, slightly more performant and easy-to-read form.

import type { IncomingMessage } from 'node:http';
import { isArray, isEmpty, isFunction, isObject, isString } from '../../guards';
import { mergeObjects } from '../../objects';
import { toArray } from '../../arrays';
import type { Cookie } from '../../types';
import { splitCookiesString, parseCookieChunk, DEFAULT_OPTIONS } from './parse-response-cookie.utils';

// eslint-disable-next-line import/exports-last
export type Options = {
	/**
	 * Whether to call `decodeURIComponent` for each value.
	 *
	 * @default true
	 */
	decodeValues: boolean;

	/**
	 * Return value format.
	 *
	 * @default 'array'
	 */
	returnType: 'array' | 'object';
};

type CookieMap = Record<string, Cookie>;

type ToReturn<UserOptions extends Partial<Options> | undefined> = UserOptions extends Partial<Options>
	? UserOptions['returnType'] extends string
		? UserOptions['returnType'] extends 'object' ? CookieMap : Cookie[]
		: Cookie[]
	: Cookie[];

/**
 * Parses a cookie header into `Cookie` objects.
 *
 * @param   input         A string containing the cookie header, an array of such strings or fetch `Response` object.
 * @param   userOptions   Parser options.
 * @returns               Array of parsed cookie objects or object containing cookie name
 *                        as a key and cookie object as a value depending on `userOptions.returnType` property.
 */
export const parseResponseCookie = <UserOptions extends Partial<Options> = typeof DEFAULT_OPTIONS>(
	input: string | string[] | Response | IncomingMessage | undefined | null,
	userOptions?: UserOptions,
): ToReturn<UserOptions> => {
	const options = mergeObjects(DEFAULT_OPTIONS, userOptions) as Required<Options>;

	if (isEmpty(input)) {
		return options.returnType === 'array'
			? [] as unknown as ToReturn<UserOptions>
			: {} as ToReturn<UserOptions>;
	}

	const setCookieValue = toArray((() => {
		if (isString(input)) return splitCookiesString(input);
		if (isArray(input)) return input.reduce<string[]>((acc, value) => [...acc, ...splitCookiesString(value)], []);
		if (isObject(input) && 'headers' in input) {
			if (isFunction(input.headers.getSetCookie)) return splitCookiesString(input.headers.getSetCookie());
			if ('set-headers' in input.headers) { return splitCookiesString(input.headers['set-cookie']) ?? ''; }

			const key = Object.keys(input.headers).find((header) => header.toLowerCase() === 'set-cookie');
			if (key && key in input.headers) {
				/* @ts-expect-error -- Edge case for some environments. */
				// @see https://github.com/nfriedly/set-cookie-parser/pull/25
				return splitCookiesString(input.headers[key]) as string;
			}
			return '';
		}
		return '';
	})()).filter(Boolean);

	return options.returnType === 'array'
		? setCookieValue.map((chunk) => {
			return parseCookieChunk(chunk, options.decodeValues);
		}).filter(Boolean) as ToReturn<UserOptions>
		: setCookieValue.reduce<CookieMap>((acc, chunk) => {
			const cookie = parseCookieChunk(chunk, options.decodeValues);
			if (!cookie) return acc;
			acc[cookie.name] = cookie;
			return acc;
		}, {}) as ToReturn<UserOptions>;
};
