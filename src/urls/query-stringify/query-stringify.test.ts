import { queryStringify } from './query-stringify';

describe('query-stringify', () => {
	it('Returns empty string for empty/invalid input', () => {
		/* @ts-expect-error -- Edge case */
		expect(queryStringify('')).toBe('');

		expect(queryStringify([])).toBe('');
		expect(queryStringify(undefined)).toBe('');
		expect(queryStringify({})).toBe('');
	});

	it('Stringifies a simple object', () => {
		expect(queryStringify({ a: 1, b: '2' })).toBe('a=1&b=2');
	});

	it('Encodes keys and values', () => {
		expect(queryStringify({ 'foo+bar': 'foo+bar' })).toBe('foo%2Bbar=foo%2Bbar');
	});

	it('Stringifies an object containing nested keys', () => {
		expect(queryStringify({ a: 1, b: '2', c: { a: { d: 1 } } })).toBe('a=1&b=2&c[a][d]=1');
	});

	it('Stringifies an arrays', () => {
		expect(queryStringify({ a: 1, b: ['2', 3] })).toBe('a=1&b[0]=2&b[1]=3');
	});

	it('Respects `prefix` argument', () => {
		expect(queryStringify({ a: 1, b: 2 }, 'data')).toBe('data[a]=1&data[b]=2');
	});
});
