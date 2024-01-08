/**
 * A cookie in object form.
 */
export type Cookie = {
	/**
	 * Cookie name.
	 */
	name: string;

	/**
	 * Cookie value.
	 */
	value: string;

	/**
	 * Cookie path.
	 */
	path?: string;

	/**
	 * Absolute expiration date for the cookie.
	 */
	expires?: Date;

	/**
	 * Relative max age of the cookie in seconds from when the client receives it (integer).
	 * Note: when using with `express`'s `res.cookie()` method, multiply `maxAge` by 1000 to convert to milliseconds.
	 */
	maxAge?: number;

	/**
	 * Domain for the cookie.
	 * May begin with "." to indicate the named domain or any subdomain of it.
	 */
	domain?: string;

	/**
	 * Indicates that this cookie should only be sent over HTTPs.
	 */
	secure?: boolean;

	/**
	 * Indicates that this cookie should not be accessible to client-side JavaScript.
	 */
	httpOnly?: boolean;

	/**
	 * Indicates that the cookie should be stored using partitioned storage.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Privacy/Partitioned_cookies
	 */
	partitioned?: boolean;

	/**
	 * Indicates that this cookie should not be sent along with cross-site requests.
	 *
	 * @see https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
	 */
	sameSite?: 'Strict' | 'Lax' | 'None';

	/**
	 * Allows servers to specify a retention priority for HTTP cookies
	 * that will be respected by user agents during cookie eviction.
	 *
	 * @see https://datatracker.ietf.org/doc/html/draft-west-cookie-priority-00
	 */
	priority?: 'Low' | 'Medium' | 'High';

	/**
	 * For future extensions.
	 */
	[key: string]: any;
};
