// Just a custom implementation of `https://github.com/nfriedly/set-cookie-parser/`
// written in a modern syntax with TS types included, also written in a more performant and easy-to-read way (double options init, no returns, extra checks in while loops, negated loops, etc)

import { isArray, isEmpty, isString, isDate } from '../../guards';
import { capitalize } from '../../strings';
import type { Cookie } from '../../types';
import type { Options } from './parse-response-cookie';

/**
 * Parses name-value pairs according to rfc6265bis draft.
 *
 * @see https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/
 *
 * @param   maybePair   A name-value pair or just a string value.
 *
 * @returns             Object containing name and value keys according to rfc6265bis.
 */
const parseNameValuePair = (maybePair: string) => {
	const parts = maybePair.split('=');

	// Strange, but documented
	// https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/#:~:text=If%20the%20name%2Dvalue%2Dpair%20string%20lacks%20a%20%25x3D%20(%22%3D%22)%20character
	if (parts.length === 1) {
		return { name: '', value: maybePair };
	}

	if (parts.length > 1) {
		const [name, ...values] = parts;
		return { name, value: values.join('=') };
	}

	// Impossible scenario if everyone follows the specification,
	// but for completeness it should be here.
	return null;
};

export const DEFAULT_OPTIONS: Options = {
	decodeValues: true,
	returnType: 'array',
};


export const parseCookieChunk = (chunk: string, decodeValues: boolean) => {
	const parts = chunk.split(';').filter(Boolean);

	const pair = parts.shift();
	if (!pair) return null;

	const parsed = parseNameValuePair(pair);
	if (!parsed) return null;

	const value = (() => {
		if (!decodeValues) return parsed.value;

		try {
			return decodeURIComponent(parsed.value);
		} catch {
			return parsed.value;
		}
	})();

	const cookie: Cookie = {
		name: parsed.name,
		value,
	};

	parts.forEach((part) => {
		const sides = part.split('=');
		if (isEmpty(sides)) return;

		const key = sides.shift()!.trim().toLowerCase();
		const keyValue = sides.join('=');

		if (key === 'expires') {
			const maybeDate = new Date(keyValue);
			if (!isDate(maybeDate, true)) return;
			cookie.expires = new Date(keyValue);
			return;
		}

		if (key === 'max-age') {
			const maybeNumber = parseInt(keyValue, 10);
			if (Number.isNaN(maybeNumber)) return;
			cookie.maxAge = maybeNumber;
			return;
		}

		if (key === 'secure') {
			cookie.secure = true;
			return;
		}

		if (key === 'httponly') {
			cookie.httpOnly = true;
			return;
		}

		if (key === 'samesite') {
			if (keyValue.toLowerCase() === 'strict' || keyValue.toLowerCase() === 'lax' || keyValue.toLowerCase() === 'none') {
				cookie.sameSite = capitalize(keyValue.toLowerCase()) as any;
			}
			return;
		}

		if (key === 'partitioned') {
			cookie.partitioned = true;
			return;
		}

		if (key === 'priority') {
			if (keyValue.toLowerCase() === 'low' || keyValue.toLowerCase() === 'medium' || keyValue.toLowerCase() === 'high') {
				cookie.priority = capitalize(keyValue.toLowerCase()) as any;
			}
			return;
		}

		// For future extensions.
		keyValue && (cookie[key] = keyValue);
	});

	return cookie;
};

export const splitCookiesString = (cookiesString: unknown): string[] => {
	if (isArray(cookiesString)) return cookiesString;

	if (!isString(cookiesString)) return [];

	const cookieStrings: string[] = [];

	let position = 0;

	const skipWhitespace = () => {
		while (position < cookiesString.length && /\s/.test(cookiesString[position])) {
			position++;
		}
		return position < cookiesString.length;
	};

	const notSpecialCharacter = () => {
		return !['=', ';', ','].includes(cookiesString[position]);
	};

	while (position < cookiesString.length) {
		let start = position;
		let cookiesSeparatorFound = false;
		let lastComma = 0;
		let nextStart = 0;

		while (skipWhitespace()) {
			if (cookiesString[position] !== ',') { position++; continue; }

			// ',' is a cookie separator if we have later first '=', not ';' or ','
			lastComma = position++;
			skipWhitespace();
			nextStart = position;

			while (notSpecialCharacter() && position < cookiesString.length) {
				position++;
			}

			if (position < cookiesString.length && cookiesString[position] === '=') {
				cookiesSeparatorFound = true;
				// Position is inside the next cookie, so back up and return it.
				position = nextStart;
				cookieStrings.push(cookiesString.slice(start, lastComma));
				start = position;
			} else {
				// In param ',' or param separator ';', we continue from that comma
				position = lastComma + 1;
			}
		}

		if (!cookiesSeparatorFound || position >= cookiesString.length) {
			cookieStrings.push(cookiesString.slice(start, cookiesString.length));
		}
	}

	return cookieStrings;
};
