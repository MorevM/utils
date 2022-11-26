import { isMap } from './is-map';

describe('is-map', () => {
	it('Returns `true` if the given value is a Map', () => {
		expect(isMap(new Map())).toBe(true);
	});

	it('Returns `false` if the given value isn\'t a Map', () => {
		expect(isMap(1)).toBe(false);
		expect(isMap({})).toBe(false);
		expect(isMap(null)).toBe(false);
		expect(isMap(true)).toBe(false);
		expect(isMap(/foo/)).toBe(false);
		expect(isMap([new Map()])).toBe(false);
	});

	it('Returns `false` if the given value is a WeakMap', () => {
		expect(isMap(new WeakMap())).toBe(false);
	});

	it('Returns `false` for Map-like object', () => {
		expect(isMap({
			clear: () => {},
			delete: () => {},
			get: () => {},
			has: () => {},
			set: () => {},
		})).toBe(false);
	});
});
