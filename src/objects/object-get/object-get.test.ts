import { objectGet } from './object-get';

const s = {
	a: 1,
	b: [1, 2, 3],
	c: { a: [undefined, null, true, [Infinity], [{ q: 'q' }]] },
	d: [{ a: [undefined, null, true, [Infinity], [{ q: 'q' }]] }],
};

describe('object-get', () => {
	it('Retrieves a value from an object using string path notation', () => {
		expect(objectGet(s, 'a')).toBe(1);
		expect(objectGet(s, 'b')).toStrictEqual([1, 2, 3]);
		expect(objectGet(s, 'c')).toStrictEqual({ a: [undefined, null, true, [Infinity], [{ q: 'q' }]] });
		expect(objectGet(s, 'c.a')).toStrictEqual([undefined, null, true, [Infinity], [{ q: 'q' }]]);
		expect(objectGet(s, 'c.a.3')).toStrictEqual([Infinity]);
		expect(objectGet(s, 'c.a.3[0]')).toStrictEqual(Infinity);
		expect(objectGet(s, 'c.a.[4]')).toStrictEqual([{ q: 'q' }]);
		expect(objectGet(s, 'c.a.[4][0].q')).toBe('q');
		expect(objectGet(s, 'c.a.[4][0][q]')).toBe('q');
		expect(objectGet(s, 'd.0.a.[4][0].q')).toBe('q');
		expect(objectGet(s, 'd[0].a.[4][0][q]')).toBe('q');
	});

	it('Retrieves a value from an object using array path notation', () => {
		expect(objectGet(s, ['a'])).toBe(1);
		expect(objectGet(s, ['c', 'a'])).toStrictEqual([undefined, null, true, [Infinity], [{ q: 'q' }]]);
		expect(objectGet(s, ['c', 'a', '3'])).toStrictEqual([Infinity]);
		expect(objectGet(s, ['c', 'a', 3])).toStrictEqual([Infinity]);
		expect(objectGet(s, ['c.a', '3[0]'])).toStrictEqual(Infinity);
		expect(objectGet(s, ['d', 0, 'a', '4', '[0].q'])).toBe('q');
		expect(objectGet(s, ['d[0].a.[4][0]', '[q]'])).toBe('q');
	});

	it('Correctly works with root array', () => {
		expect(objectGet([1, { 1: 2 }], '[0]')).toBe(1);
		expect(objectGet([1, { 1: 2 }], '1.1')).toBe(2);
	});

	it('Correctly returns `null` and `undefined` values', () => {
		expect(objectGet(s, ['c.a.0'], 1)).toBeUndefined();
		expect(objectGet(s, ['c.a.1'], 1)).toBeNull();
	});

	it('Returns the input itself for empty paths', () => {
		expect(objectGet(s, '     ')).toStrictEqual(s);
		expect(objectGet([s], '  ')).toStrictEqual([s]);
		expect(objectGet(s, [])).toStrictEqual(s);
		expect(objectGet(s, ['  ', ''])).toStrictEqual(s);
	});

	it('Returns `undefined` for inexistent paths with no third argument, with empty input or empty path', () => {
		expect(objectGet(s, ['d.da.0'])).toBeUndefined();
		expect(objectGet(null, ['d.da.0'])).toBeUndefined();
		expect(objectGet(null, [''])).toBeUndefined();
		expect(objectGet(s, null)).toBeUndefined();
	});

	it('Returns `defaultValue` if specified for inexistent paths', () => {
		expect(objectGet(s, ['d.da.0'], 1)).toBe(1);
		expect(objectGet(null, ['d.da.0'], true)).toBe(true);
		expect(objectGet(null, [''], null)).toBeNull();
		expect(objectGet(s, null, 'foo')).toBe('foo');
	});

	it('Returns `defaultValue` for non-object and non-array values', () => {
		expect(objectGet(true, 'a.b.c')).toBeUndefined();
		expect(objectGet(null, 'a.b.c')).toBeUndefined();
		expect(objectGet(undefined, 'a.b.c')).toBeUndefined();
		expect(objectGet(10n, 'a.b.c')).toBeUndefined();
		expect(objectGet(10, 'a.b.c')).toBeUndefined();
		expect(objectGet(Symbol('foo'), 'a.b.c')).toBeUndefined();
		expect(objectGet(new WeakMap(), 'a.b.c')).toBeUndefined();
		expect(objectGet('some', 'a.b.c')).toBeUndefined();
		expect(objectGet('someString', '2')).toBeUndefined();
	});
});
