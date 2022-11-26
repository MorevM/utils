import { isWeakMap } from './is-weak-map';

describe('is-weak-map', () => {
	it('Returns `true` if the given value is a WeakMap', () => {
		expect(isWeakMap(new WeakMap())).toBe(true);
	});

	it('Returns `false` if the given value isn\'t a WeakMap', () => {
		expect(isWeakMap(1)).toBe(false);
		expect(isWeakMap({})).toBe(false);
		expect(isWeakMap(null)).toBe(false);
		expect(isWeakMap(true)).toBe(false);
		expect(isWeakMap(/foo/)).toBe(false);
		expect(isWeakMap([new WeakMap()])).toBe(false);
	});

	it('Returns `false` if the given value is a Map', () => {
		expect(isWeakMap(new Map())).toBe(false);
	});

	it('Returns `false` for WeakMap-like object', () => {
		expect(isWeakMap({
			delete: () => {},
			get: () => {},
			has: () => {},
			set: () => {},
		})).toBe(false);
	});
});
