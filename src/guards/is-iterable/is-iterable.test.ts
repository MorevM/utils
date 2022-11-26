import { isIterable } from './is-iterable';

describe('is-iterable', () => {
	it('Returns `true` if a given value is an array', () => {
		expect(isIterable([])).toBe(true);
	});

	it('Returns `true` if a given value is a `Map`/`Set` object', () => {
		expect(isIterable(new Map())).toBe(true);
		expect(isIterable(new Set())).toBe(true);
	});

	it('Returns `true` if a given value is a `NodeList`', () => {
		expect(isIterable(document.querySelectorAll('foo'))).toBe(true);
	});

	it('Returns `true` if a given value is an `HTMLCollection`', () => {
		// eslint-disable-next-line unicorn/prefer-query-selector
		expect(isIterable(document.getElementsByClassName('qwe'))).toBe(true);
	});

	it('Returns `true` if a given value is a string', () => {
		expect(isIterable('123')).toBe(true);
	});

	it('Returns `false` if a given value is a `null`', () => {
		expect(isIterable(null)).toBe(false);
	});

	it('Returns `false` if a given value is an `undefined`', () => {
		expect(isIterable(undefined)).toBe(false);
	});

	it('Returns `false` if a given value is a `Symbol`', () => {
		expect(isIterable(Symbol('foo'))).toBe(false);
	});

	it('Returns `false` if a given value is a `BigInt`', () => {
		expect(isIterable(10n)).toBe(false);
	});

	it('Returns `false` if a given value is a number', () => {
		expect(isIterable(1)).toBe(false);
		expect(isIterable(Infinity)).toBe(false);
		expect(isIterable(NaN)).toBe(false);
	});

	it('Returns `false` if a given value is a plain object', () => {
		expect(isIterable({})).toBe(false);
	});

	it('Returns `false` if a given value is a `WeakMap`/`WeakSet` object', () => {
		expect(isIterable(new WeakMap())).toBe(false);
		expect(isIterable(new WeakSet())).toBe(false);
	});

	it('Returns `false` if a given value is a boolean', () => {
		expect(isIterable(true)).toBe(false);
		expect(isIterable(false)).toBe(false);
	});

	it('Returns `false` if a given value is a function', () => {
		expect(isIterable(() => {})).toBe(false);
	});

	it('Returns `false` if a given value is a `Promise` object', () => {
		expect(isIterable(Promise.resolve('foo'))).toBe(false);
	});
});
