import { isDate, isEmpty, isNullish } from '../../guards';
import { mergeObjects } from '../../objects';
import type { Cookie } from '../../types';

type Options = {
	/**
	 * Whether the cookie value should be encoded using `encodeURIComponent`.
	 *
	 * @default true
	 */
	encodeValue: boolean;
};

const DEFAULT_OPTIONS: Options = {
	encodeValue: true,
};

/**
 * Serializes a Cookie object into cookie string.
 *
 * @param   cookie        Object representing a cookie.
 * @param   userOptions   Serialization options.
 *
 * @returns               A cookie string.
 */
export const serializeCookie = (cookie: Cookie, userOptions?: Partial<Options>) => {
	const options = mergeObjects(DEFAULT_OPTIONS, userOptions) as Required<Options>;

	const value = options.encodeValue ? encodeURIComponent(cookie.value) : cookie.value;

	let cookieString: string = cookie.name
		? `${cookie.name}=${value}`
		: value;

	if ('maxAge' in cookie && !isNullish(cookie.maxAge)) {
		const maybeMaxAge = parseInt(`${cookie.maxAge}`, 10);

		if (!Number.isNaN(maybeMaxAge) && Number.isFinite(maybeMaxAge)) {
			cookieString += `; Max-Age=${maybeMaxAge}`;
		}
	}

	if ('domain' in cookie && !isEmpty(cookie.domain)) {
		cookieString += `; Domain=${cookie.domain}`;
	}

	if ('path' in cookie && !isEmpty(cookie.path)) {
		cookieString += `; Path=${cookie.path}`;
	}

	if ('expires' in cookie && isDate(cookie.expires, true)) {
		cookieString += `; Expires=${cookie.expires.toUTCString()}`;
	}

	if (cookie.httpOnly) {
		cookieString += '; HttpOnly';
	}

	if (cookie.secure) {
		cookieString += '; Secure';
	}

	if (cookie.partitioned) {
		cookieString += '; Partitioned';
	}

	if (cookie.sameSite) {
		// eslint-disable-next-line no-autofix/unicorn/no-lonely-if
		if (cookie.sameSite === 'Strict' || cookie.sameSite === 'Lax' || cookie.sameSite === 'None') {
			cookieString += `; SameSite=${cookie.sameSite}`;
		}
	}

	if (cookie.priority) {
		// eslint-disable-next-line no-autofix/unicorn/no-lonely-if
		if (cookie.priority === 'Low' || cookie.priority === 'Medium' || cookie.priority === 'High') {
			cookieString += `; Priority=${cookie.priority}`;
		}
	}

	return cookieString;
};
