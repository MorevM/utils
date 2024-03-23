import { lerp } from './lerp';

describe('lerp', () => {
	it('Works as documented for simple cases', () => {
		expect(lerp(2, 4, 0)).toBe(2);
		expect(lerp(2, 4, 1)).toBe(4);
		expect(lerp(2, 4, .5)).toBe(3);
		//
		expect(lerp(0, 1, .33)).toBe(.33);
	});

	it('Works with negative values', () => {
		expect(lerp(-4, -2, 0)).toBe(-4);
		expect(lerp(-4, -2, .5)).toBe(-3);
		expect(lerp(-4, -2, 1)).toBe(-2);
		//
		expect(lerp(-50, 50, .5)).toBe(0);
		expect(lerp(-50, 50, .33)).toBe(-50 + 33);
		expect(lerp(-50, 50, .66)).toBe(-50 + 66);
	});

	it('Works with the same `start` and `end` values', () => {
		expect(lerp(1, 1, 0)).toBe(1);
		expect(lerp(1, 1, .5)).toBe(1);
		expect(lerp(1, 1, 1)).toBe(1);
	});

	it('Works for the same start and end values', () => {
		expect(lerp(-4, -2, 0)).toBe(-4);
		expect(lerp(-4, -2, .5)).toBe(-3);
		expect(lerp(-4, -2, 1)).toBe(-2);
		//
		expect(lerp(-50, 50, .5)).toBe(0);
		expect(lerp(-50, 50, .33)).toBe(-50 + 33);
		expect(lerp(-50, 50, .66)).toBe(-50 + 66);
	});

	it('Can overload interpolation value', () => {
		expect(lerp(0, 1, -1)).toBe(-1);
		expect(lerp(0, 1, 2)).toBe(2);
	});

	it('Returns `NaN` if `NaN` is given as any argument', () => {
		expect(lerp(NaN, 10, 1)).toBeNaN();
		expect(lerp(0, NaN, 1)).toBeNaN();
		expect(lerp(0, 10, NaN)).toBeNaN();
	});
});
