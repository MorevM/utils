import { rangeIncludes } from './range-includes';

describe('range-includes', () => {
	it('Returns `true` if a given range includes a given value', () => {
		expect(rangeIncludes(150, [[100, 200]])).toBe(true);
	});

	it('Returns `true` if at least one of a given ranges includes a given value', () => {
		expect(rangeIncludes(150, [[10, 20], [100, 200], [500, 1000]])).toBe(true);
	});

	it('Returns `true` if a given value is the bound value', () => {
		expect(rangeIncludes(100, [[100, 200]])).toBe(true);
		expect(rangeIncludes(200, [[100, 200]])).toBe(true);
	});

	it('Returns `false` if no one of a given ranges includes a given value', () => {
		expect(rangeIncludes(500, [[10, 20], [100, 200]])).toBe(false);
	});

	it('Returns `false` if no ranges given', () => {
		expect(rangeIncludes(100, [])).toBe(false);
	});

	it('Returns `true` if a given opened range includes a given value', () => {
		expect(rangeIncludes(100, [[null, 200]])).toBe(true);
		expect(rangeIncludes(100, [[-Infinity, 200]])).toBe(true);
		expect(rangeIncludes(100, [[100, null]])).toBe(true);
		expect(rangeIncludes(100, [[100, Infinity]])).toBe(true);
		expect(rangeIncludes(100, [[null, 50], [null, 90], [100, null]])).toBe(true);
		expect(rangeIncludes(100, [[-Infinity, 50], [-Infinity, 90], [100, Infinity]])).toBe(true);
	});

	it('Returns `false` if no one of a given opened ranges includes a given value', () => {
		expect(rangeIncludes(220, [[null, 200]])).toBe(false);
		expect(rangeIncludes(90, [[100, null]])).toBe(false);
		expect(rangeIncludes(100, [[null, 50], [null, 90], [101, null]])).toBe(false);
	});

	it('Returns `true` if all ranges include a given value (mode === `all`)', () => {
		expect(rangeIncludes(15, [[10, 20], [10, 200], [15, 1000]], 'all')).toBe(true);
	});

	it('Returns `false` if not all ranges include a given value (mode === `all`)', () => {
		expect(rangeIncludes(21, [[10, 20], [100, 200], [500, 1000]], 'all')).toBe(false);
	});

	it('Returns `false` if no one of a given ranges includes a given value (mode === `all`)', () => {
		expect(rangeIncludes(500, [[10, 20], [100, 200]], 'all')).toBe(false);
	});
});
