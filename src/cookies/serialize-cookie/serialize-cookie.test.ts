import { serializeCookie } from './serialize-cookie';

describe('serialize-cookie', () => {
	describe('Basics', () => {
		it('Should serialize name-value pair', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar' })).toBe('foo=bar');
		});

		// This is strange, but documented
		// https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/#:~:text=If%20the%20name%2Dvalue%2Dpair%20string%20lacks%20a%20%25x3D%20(%22%3D%22)%20character
		it('Should serialize value with empty name', () => {
			expect(serializeCookie({ name: '', value: 'bar' })).toBe('bar');
		});

		it('Should serialize name with empty value', () => {
			expect(serializeCookie({ name: 'foo', value: '' })).toBe('foo=');
		});

		it('Should encode value by default', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar +baz' })).toBe('foo=bar%20%2Bbaz');
		});

		it('Should not encode value if `encodeValues` is false', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar +baz' }, { encodeValue: false })).toBe('foo=bar +baz');
		});
	});

	describe('Domain', () => {
		it('Should serialize `domain`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', domain: 'example.com' })).toBe('foo=bar; Domain=example.com');
		});

		it('Should skip empty `domain`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', domain: '' })).toBe('foo=bar');
		});
	});

	describe('Expires', () => {
		it('Should serialize `expires`', () => {
			expect(serializeCookie({
				name: 'foo',
				value: 'bar',
				expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
			})).toBe('foo=bar; Expires=Sun, 24 Dec 2000 10:30:59 GMT');
		});

		it('Should skip an invalid date for `expires` key', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', expires: new Date('foo') })).toBe('foo=bar');
		});
	});

	describe('HttpOnly', () => {
		it('Should serialize `httpOnly`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', httpOnly: true })).toBe('foo=bar; HttpOnly');
		});

		it('Should skip `HttpOnly` flag if `httpOnly` option is set to `false`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', httpOnly: false })).toBe('foo=bar');
		});
	});

	describe('Partitioned', () => {
		it('Should serialize `partitioned`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', partitioned: true })).toBe('foo=bar; Partitioned');
		});

		it('Should skip `Partitioned` flag if `partitioned` option is set to `false`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', partitioned: false })).toBe('foo=bar');
		});
	});

	describe('Secure', () => {
		it('Should serialize `secure`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', secure: true })).toBe('foo=bar; Secure');
		});

		it('Should skip `Secure` flag if `secure` option is set to `false`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', secure: false })).toBe('foo=bar');
		});
	});

	describe('MaxAge', () => {
		it('Should serialize valid `maxAge` option', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', maxAge: 10 })).toBe('foo=bar; Max-Age=10');
			expect(serializeCookie({ name: 'foo', value: 'bar', maxAge: 0 })).toBe('foo=bar; Max-Age=0');
		});

		it('Should skip invalid `maxAge` option', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', maxAge: Infinity })).toBe('foo=bar');
			expect(serializeCookie({ name: 'foo', value: 'bar', maxAge: undefined })).toBe('foo=bar');
		});

		it('Should transform `maxAge` value to integer', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', maxAge: 3.14 })).toBe('foo=bar; Max-Age=3');
		});
	});

	describe('Path', () => {
		it('Should serialize `path`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', path: '/' })).toBe('foo=bar; Path=/');
		});

		it('Should skip empty `path`', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', path: '' })).toBe('foo=bar');
		});
	});

	describe('Priority', () => {
		it('Should serialize a valid `priority` option value', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', priority: 'Low' })).toBe('foo=bar; Priority=Low');
			expect(serializeCookie({ name: 'foo', value: 'bar', priority: 'Medium' })).toBe('foo=bar; Priority=Medium');
			expect(serializeCookie({ name: 'foo', value: 'bar', priority: 'High' })).toBe('foo=bar; Priority=High');
		});

		it('Should skip an invalid `priority` option value', () => {
			/* @ts-expect-error -- Edge case */
			expect(serializeCookie({ name: 'foo', value: 'bar', priority: 'foo' })).toBe('foo=bar');
		});
	});

	describe('SameSite', () => {
		it('Should serialize a valid `SameSite` option value', () => {
			expect(serializeCookie({ name: 'foo', value: 'bar', sameSite: 'Strict' })).toBe('foo=bar; SameSite=Strict');
			expect(serializeCookie({ name: 'foo', value: 'bar', sameSite: 'Lax' })).toBe('foo=bar; SameSite=Lax');
			expect(serializeCookie({ name: 'foo', value: 'bar', sameSite: 'None' })).toBe('foo=bar; SameSite=None');
		});

		it('Should skip an invalid `sameSite` option value', () => {
			/* @ts-expect-error -- Edge case */
			expect(serializeCookie({ name: 'foo', value: 'bar', sameSite: 'foo' })).toBe('foo=bar');
		});
	});

	describe('Complex example', () => {
		it('Should serialize a complex cookie containing multiple options', () => {
			const complexCookie = serializeCookie({
				name: 'foo',
				value: 'bar',
				domain: 'example.com',
				expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
				httpOnly: true,
				maxAge: 10,
				partitioned: true,
				path: '/',
				priority: 'High',
				sameSite: 'Lax',
				secure: true,
			});

			expect(complexCookie).toContain('foo=bar');
			expect(complexCookie).toContain('Domain=example.com');
			expect(complexCookie).toContain('Expires=Sun, 24 Dec 2000 10:30:59 GMT');
			expect(complexCookie).toContain('HttpOnly');
			expect(complexCookie).toContain('Max-Age=10');
			expect(complexCookie).toContain('Partitioned');
			expect(complexCookie).toContain('Path=/');
			expect(complexCookie).toContain('Priority=High');
			expect(complexCookie).toContain('SameSite=Lax');
			expect(complexCookie).toContain('Secure');
		});
	});
});
