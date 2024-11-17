import { deepEqual, deepEqualCircular } from './deep-equal';

const fn = () => ({});

describe('deep-equal', () => {
	describe('Primitives', () => {
		// Numbers
		it('Returns `true` for equal numbers', () => {
			expect(deepEqual(0, 0)).toBe(true);
			expect(deepEqual(3.14, 3.14)).toBe(true);
			expect(deepEqual(+0, -0)).toBe(true);
			expect(deepEqual(1, 1)).toBe(true);
			expect(deepEqual(Infinity, Infinity)).toBe(true);
			expect(deepEqual(Number(1), Number(1))).toBe(true);
			expect(deepEqual(NaN, NaN)).toBe(true);
		});

		it('Returns `false` for not equal numbers', () => {
			expect(deepEqual(-1.01, 1.01)).toBe(false);
			expect(deepEqual(1, 2)).toBe(false);
			expect(deepEqual(-Infinity, +Infinity)).toBe(false);
			expect(deepEqual(Number(1), Number(2))).toBe(false);
			expect(deepEqual(1, true)).toBe(false);
			expect(deepEqual(1, [])).toBe(false);
			expect(deepEqual(1, [1])).toBe(false);
			expect(deepEqual(1, {})).toBe(false);
			expect(deepEqual(1, { 1: 1 })).toBe(false);
			expect(deepEqual(0, null)).toBe(false);
			expect(deepEqual(0, undefined)).toBe(false);
			expect(deepEqual(0, NaN)).toBe(false);
		});

		// Strings
		it('Returns `true` for equal strings', () => {
			expect(deepEqual('', '')).toBe(true);
			expect(deepEqual('foo', 'foo')).toBe(true);
			expect(deepEqual(String('bar'), String('bar'))).toBe(true);
		});

		it('Returns `false` for not equal strings', () => {
			expect(deepEqual('', '-')).toBe(false);
			expect(deepEqual('foo', 'bar')).toBe(false);
			expect(deepEqual(String('bar'), String('baz'))).toBe(false);
			expect(deepEqual('', null)).toBe(false);
			expect(deepEqual('', undefined)).toBe(false);
			expect(deepEqual('', NaN)).toBe(false);
		});

		// Booleans
		it('Returns `true` for equal booleans', () => {
			expect(deepEqual(true, true)).toBe(true);
			expect(deepEqual(false, false)).toBe(true);
		});

		it('Returns `false` for not equal booleans', () => {
			expect(deepEqual(true, false)).toBe(false);
			expect(deepEqual(false, true)).toBe(false);
			expect(deepEqual(false, null)).toBe(false);
			expect(deepEqual(false, undefined)).toBe(false);
			expect(deepEqual(false, NaN)).toBe(false);
		});

		it('Returns false for different types given', () => {
			expect(deepEqual(true, 1)).toBe(false);
			expect(deepEqual(0, false)).toBe(false);
			expect(deepEqual('foo', Symbol('foo'))).toBe(false);
			expect(deepEqual('foo', {})).toBe(false);
			expect(deepEqual({}, [])).toBe(false);
			expect(deepEqual(null, undefined)).toBe(false);
			expect(deepEqual(null, {})).toBe(false);
			expect(deepEqual(NaN, null)).toBe(false);
			expect(deepEqual(NaN, undefined)).toBe(false);
		});
	});

	describe('Functions', () => {
		it('Returns `true` for equal functions', () => {
			const b = fn;

			expect(deepEqual(fn, b)).toBe(true);
		});

		it('Returns `false` for not equal functions', () => {
			expect(deepEqual(fn, () => {})).toBe(false);
		});
	});

	describe('Objects', () => {
		it('Returns `true` for same objects', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = a;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `true` for identical objects', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { ...a };

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `true` for identical objects, but its properties are placed in different order', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { baz: 3, bar: 2, foo: 1 };

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal objects (extra property)', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { foo: 1, bar: 2 };

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for not equal objects (different property name)', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { foo: 1, bar: 2, bAz: 3 };

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for not equal objects (different property value)', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { foo: 1, bar: 2, baz: 4 };

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for not equal objects (nested properties)', () => {
			const a = { foo: 1, bar: 2, baz: 3 };
			const b = { foo: 1, bar: 2, baz: 4 };

			const a2 = { foo: { foo: 1, bar: 2 } };
			const b2 = { foo: { foo: 2, baz: 2 } };

			expect(deepEqual(a, b)).toBe(false);
			expect(deepEqual(a2, b2)).toBe(false);
		});
	});

	describe('Arrays', () => {
		it('Returns `true` if given arrays are the same', () => {
			const a = [1, 2, 3];
			const b = a;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `true` if given arrays are identical', () => {
			const a = [1, 2, 3];
			const b = [...a];

			expect(deepEqual(b, [...a])).toBe(true);
		});

		it('Returns `true` for equal arrays with inner objects', () => {
			const a = [1, 2, 3, [1, 2, 3, { a: 1, b: [1, 2] }]];
			const b = [1, 2, 3, [1, 2, 3, { a: 1, b: [1, 2] }]];

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal arrays with inner objects', () => {
			const a = [1, 2, 3, [1, 2, 3, { a: 1, b: [1, 2] }]];
			const b = [1, 2, 3, [1, 2, 3, { a: 2, b: [1, 2] }]];
			const c = [1, 2, 3, [1, 2, 3, { A: 1, b: [1, 2] }]];

			expect(deepEqual(a, b)).toBe(false);
			expect(deepEqual(a, c)).toBe(false);
		});

		it('Returns `false` for array-like and array comparison', () => {
			const a = { 0: 1, 1: 2, length: 2 };
			const b = [1, 2];

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Dates', () => {
		it('Returns `true` for identical dates', () => {
			const a = new Date('2022-05-11T00:00:42.362Z');
			const b = new Date('2022-05-11T00:00:42.362Z');

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not identical dates', () => {
			const a = new Date('2022-05-11T00:00:42.362Z');
			const b = new Date('2022-05-11T00:00:42');

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for Date and plain object', () => {
			const a = new Date('2022-05-11T00:00:42.362Z');
			const b = {};

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `true` for invalid dates', () => {
			const a = new Date('foo');
			const b = new Date('bar');

			expect(deepEqual(a, b)).toBe(true);
		});
	});

	describe('RegExps', () => {
		it('Returns `true` for identical RegExps', () => {
			const a = /a/;
			const b = /a/;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `true` for identical RegExps with flags', () => {
			const a = /a/gi;
			const b = /a/gi;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `true` for identical RegExps with flags in different order', () => {
			const a = /a/gi;
			// eslint-disable-next-line regexp/sort-flags -- Special testing case
			const b = /a/ig;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not identical RegExps (pattern)', () => {
			const a = /a/;
			const b = /b/;

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for not identical RegExps (flags)', () => {
			const a = /a/g;
			const b = /b/;

			expect(deepEqual(a, b)).toBe(false);
		});

		it('Returns `false` for RegExp and plain object', () => {
			const a = new RegExp('foo', 'g');
			const b = {};

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Promises', () => {
		it('Returns `true` for equal Promises', () => {
			const a = Promise.resolve(1);
			const b = a;

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal Promises', () => {
			const a = Promise.resolve(1);
			const b = Promise.resolve(1);

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Maps', () => {
		it('Returns `true` for equal Maps', () => {
			const a = new Map().set('a', 'a').set('b', 'b');
			const b = new Map().set('b', 'b').set('a', 'a');

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal Maps', () => {
			const a = new Map().set('a', 'a');
			const b = new Map().set('b', 'b');

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Sets', () => {
		it('Returns `true` for equal Sets', () => {
			const a = new Set([1, 2, 3]);
			const b = new Set([1, 2, 3]);

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal Sets', () => {
			const a = new Set([1, 2, 3]);
			const b = new Set([1, 2, 3, 4]);

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Complex example', () => {
		const pr = Promise.resolve(123);

		it('Returns `true` for equal objects', () => {
			const a = {
				a: {
					a: 1,
					b: [1, 2, 3],
					c: new RegExp('foo', 'gi'),
					d: [new Date('foo'), new Date('2022-05-11')],
				},
				b: [[[1, 'foo', 'bar', { baz: undefined }]]],
				c: fn,
				d: { 0: { pr }, 1: new Set([1, 2, 3]), 2: new Map().set('a', pr) },
			};
			const b = {
				a: {
					a: 1,
					b: [1, 2, 3],
					c: new RegExp('foo', 'gi'),
					d: [new Date('foo'), new Date('2022-05-11')],
				},
				b: [[[1, 'foo', 'bar', { baz: undefined }]]],
				c: fn,
				d: { 0: { pr }, 1: new Set([1, 2, 3]), 2: new Map().set('a', pr) },
			};

			expect(deepEqual(a, b)).toBe(true);
		});

		it('Returns `false` for not equal objects', () => {
			const a = {
				a: {
					a: 1,
					b: [1, 2, 3],
					c: new RegExp('foo', 'gi'),
					d: [new Date('foo'), new Date('2022-05-11')],
				},
				b: [[[1, 'foo', 'bar', { baz: undefined }]]],
				c: fn,
				d: { 0: { pr } },
			};
			const b = {
				a: {
					a: 1,
					b: [1, 2, 3],
					c: new RegExp('foo', 'gi'),
					d: [new Date('foo'), new Date('2022-05-11')],
				},
				b: [[[1, 'foo', 'bar', { baz: 1 }]]], // here
				c: fn,
				d: { 0: { pr } },
			};

			expect(deepEqual(a, b)).toBe(false);
		});
	});

	describe('Circular', () => {
		it('Correctly handles circular references', () => {
			const a = { a: { b: { c: {} } } };
			const b = { a: { b: { c: {} } } };
			a.a.b.c = a;
			b.a.b.c = b;

			expect(deepEqualCircular(a, b)).toBe(true);
		});
	});
});
