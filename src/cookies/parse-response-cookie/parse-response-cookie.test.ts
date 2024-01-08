import { splitCookiesString } from './parse-response-cookie.utils';
import { parseResponseCookie } from './parse-response-cookie';

const array = ['a', 'b'];

const cookieNoParameters = 'sessionid=6ky4pkr7qoi4me7rwleyvxjove25huef';
const cookieWithParameters = `${cookieNoParameters}; HttpOnly; Path=/`;
const cookieWithExpires = 'cid=70125eaa-399a-41b2-b235-8a5092042dba; expires=Thu, 04-Jun-2020 12:17:56 GMT; Max-Age=63072000; Path=/; HttpOnly; Secure';
const cookieWithExpiresAtEnd =  'client_id=70125eaa-399a-41b2-b235-8a5092042dba; Max-Age=63072000; Path=/; expires=Thu, 04-Jun-2020 12:17:56 GMT';
const jsonCookie = `myJsonCookie=${JSON.stringify({ foo: 'bar', arr: [1, 2, 3] })}`;
const jsonCookieWithParameters = `${jsonCookie}; expires=Thu, 04-Jun-2020 12:17:56 GMT; Max-Age=63072000; Path=/; HttpOnly; Secure`;

const firstWithParameterSecondNoParam = `${cookieWithParameters}, ${cookieNoParameters}`;
const threeNoParameters = `${cookieNoParameters}, ${cookieNoParameters}, ${cookieNoParameters}`;
const threeWithParameters = `${cookieWithParameters}, ${cookieWithParameters}, ${cookieWithParameters}`;
const firstWithExpiresSecondNoParam = `${cookieWithExpires}, ${cookieNoParameters}`;
const firstWithExpiresSecondWithParam = `${cookieWithExpires}, ${cookieWithParameters}`;
const firstWithExpiresAtEndSecondNoParam = `${cookieWithExpiresAtEnd}, ${cookieNoParameters}`;
const firstWithExpiresAtEndSecondWithParam = `${cookieWithExpiresAtEnd}, ${cookieWithParameters}`;
const firstWithExpiresSecondWithExpires = `${cookieWithExpires}, ${cookieWithExpires}`;
const firstWithExpiresSecondWithExpiresAtEnd = `${cookieWithExpires}, ${cookieWithExpiresAtEnd}`;
const firstWithExpiresAtEndSecondWithExpires = `${cookieWithExpiresAtEnd}, ${cookieWithExpires}`;
const firstWithExpiresAtEndSecondWithExpiresAtEnd = `${cookieWithExpiresAtEnd}, ${cookieWithExpiresAtEnd}`;
const firstWithExpiresSecondWithExpiresAtEndThirdWithExpires = `${cookieWithExpires}, ${cookieWithExpiresAtEnd}, ${cookieWithExpires}`;
const firstWithExpiresSecondWithExpiresAtEndThirdWithExpiresAtEnd = `${cookieWithExpires}, ${cookieWithExpiresAtEnd}, ${cookieWithExpiresAtEnd}`;
const threeWithExpires = `${cookieWithExpires}, ${cookieWithExpires}, ${cookieWithExpires}`;
const threeWithExpiresAtEnd = `${cookieWithExpiresAtEnd}, ${cookieWithExpiresAtEnd}, ${cookieWithExpiresAtEnd}`;

const DATE_STRING = 'Tue Jul 01 2025 06:01:11 GMT-0400 (EDT)';
const DOMAIN = '.example.com';

describe('parse-response-cookie', () => {
	// https://github.com/nfriedly/set-cookie-parser/blob/master/test/split-cookies-string.js
	describe('split-cookies-string', () => {
		it('Should return an array if an array of strings is given', () => {
			const actual = splitCookiesString(array);
			const expected = array;

			expect(actual).toStrictEqual(expected);
		});

		it('Should return an empty array if non string type is given', () => {
			const actual = splitCookiesString(1);

			expect(actual).toStrictEqual([]);
		});

		it('Should parse an empty string', () => {
			const actual = splitCookiesString('');

			expect(actual).toStrictEqual([]);
		});

		it('Should parse a single cookie without parameters', () => {
			const actual = splitCookiesString(cookieNoParameters);
			const expected = [cookieNoParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse single cookie with parameters', () => {
			const actual = splitCookiesString(cookieWithParameters);
			const expected = [cookieWithParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse three cookies without parameters', () => {
			const actual = splitCookiesString(threeNoParameters);
			const expected = [cookieNoParameters, cookieNoParameters, cookieNoParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse three cookies with parameters', () => {
			const actual = splitCookiesString(threeWithParameters);
			const expected = [cookieWithParameters, cookieWithParameters, cookieWithParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with parameters, second without parameters', () => {
			const actual = splitCookiesString(firstWithParameterSecondNoParam);
			const expected = [cookieWithParameters, cookieNoParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse single cookie with expires', () => {
			const actual = splitCookiesString(cookieWithExpires);
			const expected = [cookieWithExpires];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse single cookie with expires at end', () => {
			const actual = splitCookiesString(cookieWithExpiresAtEnd);
			const expected = [cookieWithExpiresAtEnd];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second without parameters', () => {
			const actual = splitCookiesString(firstWithExpiresSecondNoParam);
			const expected = [cookieWithExpires, cookieNoParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second with parameters', () => {
			const actual = splitCookiesString(firstWithExpiresSecondWithParam);
			const expected = [cookieWithExpires, cookieWithParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires at end, second without parameters', () => {
			const actual = splitCookiesString(firstWithExpiresAtEndSecondNoParam);
			const expected = [cookieWithExpiresAtEnd, cookieNoParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires at end, second with parameters', () => {
			const actual = splitCookiesString(firstWithExpiresAtEndSecondWithParam);
			const expected = [cookieWithExpiresAtEnd, cookieWithParameters];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second with expires', () => {
			const actual = splitCookiesString(firstWithExpiresSecondWithExpires);
			const expected = [cookieWithExpires, cookieWithExpires];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second with expires at end', () => {
			const actual = splitCookiesString(firstWithExpiresSecondWithExpiresAtEnd);
			const expected = [cookieWithExpires, cookieWithExpiresAtEnd];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires at end, second with expires', () => {
			const actual = splitCookiesString(firstWithExpiresAtEndSecondWithExpires);
			const expected = [cookieWithExpiresAtEnd, cookieWithExpires];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires at end, second with expires at end', () => {
			const actual = splitCookiesString(
				firstWithExpiresAtEndSecondWithExpiresAtEnd,
			);
			const expected = [cookieWithExpiresAtEnd, cookieWithExpiresAtEnd];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second with expires at end, third with expires', () => {
			const actual = splitCookiesString(
				firstWithExpiresSecondWithExpiresAtEndThirdWithExpires,
			);
			const expected = [
				cookieWithExpires,
				cookieWithExpiresAtEnd,
				cookieWithExpires,
			];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse first with expires, second with expires at end, third with expires at end', () => {
			const actual = splitCookiesString(
				firstWithExpiresSecondWithExpiresAtEndThirdWithExpiresAtEnd,
			);
			const expected = [
				cookieWithExpires,
				cookieWithExpiresAtEnd,
				cookieWithExpiresAtEnd,
			];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse three with expires', () => {
			const actual = splitCookiesString(threeWithExpires);
			const expected = [cookieWithExpires, cookieWithExpires, cookieWithExpires];

			expect(actual).toStrictEqual(expected);
		});

		it('Should parse three with expires at end', () => {
			const actual = splitCookiesString(threeWithExpiresAtEnd);
			const expected = [
				cookieWithExpiresAtEnd,
				cookieWithExpiresAtEnd,
				cookieWithExpiresAtEnd,
			];

			expect(actual).toStrictEqual(expected);
		});

		it('Should not split JSON', () => {
			const actual = splitCookiesString(jsonCookie);
			const expected = [jsonCookie];

			expect(actual).toStrictEqual(expected);
		});

		it('Should not split JSON with parameters', () => {
			const actual = splitCookiesString(jsonCookieWithParameters);
			const expected = [jsonCookieWithParameters];

			expect(actual).toStrictEqual(expected);
		});
	});

	// https://github.com/nfriedly/set-cookie-parser/blob/master/test/set-cookie-parser.js
	// https://github.com/nfriedly/set-cookie-parser/blob/master/test/fetch.js
	describe('parse-response-cookie', () => {
		it('Should parse a simple set-cookie header', () => {
			expect(parseResponseCookie('foo=bar;'))
				.toStrictEqual([{ name: 'foo', value: 'bar' }]);
		});

		it('Should return empty array on falsy input', () => {
			expect(parseResponseCookie('')).toStrictEqual([]);
			expect(parseResponseCookie(null)).toStrictEqual([]);
			expect(parseResponseCookie(undefined)).toStrictEqual([]);
		});

		it('Should parse a complex set-cookie header', () => {
			const cookieString = 'foo=bar; Max-Age=1000; Domain=.example.com; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure';

			expect(parseResponseCookie(cookieString)).toStrictEqual([
				{
					name: 'foo',
					value: 'bar',
					path: '/',
					expires: new Date(DATE_STRING),
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
				},
			]);
		});

		it('Should parse a weird but valid cookie', () => {
			const cookieString = 'foo=bar=bar&foo=foo&John=Doe&Doe=John; Max-Age=1000; Domain=.example.com; Path=/; HttpOnly; Secure';

			expect(parseResponseCookie(cookieString)).toStrictEqual([
				{
					name: 'foo',
					value: 'bar=bar&foo=foo&John=Doe&Doe=John',
					path: '/',
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
				},
			]);
		});

		it('Should parse a cookie with percent-encoding in the data', () => {
			const cookieString = 'foo=asdf%3Basdf%3Dtrue%3Basdf%3Dasdf%3Basdf%3Dtrue%40asdf';

			expect(parseResponseCookie(cookieString)).toStrictEqual([
				{ name: 'foo', value: 'asdf;asdf=true;asdf=asdf;asdf=true@asdf' },
			]);

			expect(parseResponseCookie(cookieString, { decodeValues: false })).toStrictEqual([
				{
					name: 'foo',
					value: 'asdf%3Basdf%3Dtrue%3Basdf%3Dasdf%3Basdf%3Dtrue%40asdf',
				},
			]);
		});

		it('Should handle the case when value is not UTF-8 encoded', () => {
			const cookieString = 'foo=R%F3r%EB%80%8DP%FF%3B%2C%23%9A%0CU%8E%A2C8%D7%3C%3C%B0%DF%17%60%F7Y%DB%16%8BQ%D6%1A';

			expect(parseResponseCookie(cookieString, { decodeValues: true })).toStrictEqual([
				{
					name: 'foo',
					value: 'R%F3r%EB%80%8DP%FF%3B%2C%23%9A%0CU%8E%A2C8%D7%3C%3C%B0%DF%17%60%F7Y%DB%16%8BQ%D6%1A',
				},
			]);
		});

		it('Should work on an array of headers', () => {
			const cookieStrings = [
				'bam=baz',
				'foo=bar; Max-Age=1000; Domain=.example.com; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure',
			];

			expect(parseResponseCookie(cookieStrings)).toStrictEqual([
				{ name: 'bam', value: 'baz' },
				{
					name: 'foo',
					value: 'bar',
					path: '/',
					expires: new Date(DATE_STRING),
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
				},
			]);
		});

		it('Should work on response objects', () => {
			const mockResponse = {
				headers: {
					'set-cookie': [
						'bam=baz',
						'foo=bar; Max-Age=1000; Domain=.example.com; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure; SameSite=StriCt',
					],
				},
			};

			/* @ts-expect-error -- Minimal mock data */
			expect(parseResponseCookie(mockResponse)).toStrictEqual([
				{ name: 'bam', value: 'baz' },
				{
					name: 'foo',
					value: 'bar',
					path: '/',
					expires: new Date(DATE_STRING),
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
					sameSite: 'Strict',
				},
			]);
		});

		it('Should work with strangely capitalized set-cookie key', () => {
			const mockResponse = {
				headers: {
					'sEt-CookIe': [
						'bam=baz',
						'foo=bar; Max-Age=1000; Domain=.example.com; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure; SameSite=strict',
					],
				},
			};

			/* @ts-expect-error -- Minimal mock data with edge case */
			expect(parseResponseCookie(mockResponse)).toStrictEqual([
				{ name: 'bam', value: 'baz' },
				{
					name: 'foo',
					value: 'bar',
					path: '/',
					expires: new Date(DATE_STRING),
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
					sameSite: 'Strict',
				},
			]);
		});

		it("Should work on response objects that don't have any set-cookie headers", () => {
			const mockResponse = {
				headers: {},
			};

			/* @ts-expect-error -- Minimal mock data */
			expect(parseResponseCookie(mockResponse)).toStrictEqual([]);
		});

		it('Should return object of cookies when `returnType` option is set to `object`', () => {
			const cookieString = 'foo=bar; Max-Age=1000; Domain=.example.com; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure';

			expect(parseResponseCookie(cookieString, { returnType: 'object' })).toStrictEqual({
				foo: {
					name: 'foo',
					value: 'bar',
					path: '/',
					expires: new Date(DATE_STRING),
					maxAge: 1000,
					domain: DOMAIN,
					secure: true,
					httpOnly: true,
				},
			});
		});

		it('Should return empty object on falsy input when `returnType` option is set to `object`', () => {
			expect(parseResponseCookie('', { returnType: 'object' })).toStrictEqual({});
			expect(parseResponseCookie(null, { returnType: 'object' })).toStrictEqual({});
			expect(parseResponseCookie(undefined, { returnType: 'object' })).toStrictEqual({});
		});

		it('Should have empty name string, and value is the name-value-pair if the name-value-pair string lacks a = character', () => {
			expect(parseResponseCookie('foo;')).toStrictEqual([{ name: '', value: 'foo' }]);

			expect(parseResponseCookie('foo;SameSite=None;Secure'))
				.toStrictEqual([{ name: '', value: 'foo', sameSite: 'None', secure: true }]);
		});

		it('Should use `getSetCookie` method on a `Response` object', () => {
			const fakeResponse = {
				headers: {
					getSetCookie: () => ['foo=bar'],
				},
			};

			/* @ts-expect-error -- Minimal mock data */
			expect(parseResponseCookie(fakeResponse)).toStrictEqual([{ name: 'foo', value: 'bar' }]);
		});
	});
});
