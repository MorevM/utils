import { distance } from './distance';

describe('distance', () => {
	it('Returns the distance between two points using object notation', () => {
		expect(distance({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(0);
		expect(distance({ x: 1, y: 1 }, { x: 2, y: 1 })).toBe(1);
		expect(distance({ x: 1, y: 1 }, { x: 2, y: 2 })).toBeCloseTo(Math.sqrt(2));
	});

	it('Returns the distance between two points using array notation', () => {
		expect(distance([1, 1], [1, 1])).toBe(0);
		expect(distance([1, 1], [2, 1])).toBe(1);
		expect(distance([1, 1], [2, 2])).toBeCloseTo(Math.sqrt(2));
	});

	it('Returns the distance between two points described by separate `x` and `y` coordinates', () => {
		expect(distance(1, 1, 1, 1)).toBe(0);
		expect(distance(1, 1, 2, 1)).toBe(1);
		expect(distance(1, 1, 2, 2)).toBeCloseTo(Math.sqrt(2));
	});

	it('Returns `null` in case of invalid input', () => {
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(distance('1')).toBeNull();
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(distance([1, 1, 1, 2, 2])).toBeNull();
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(distance(null)).toBeNull();
	});
});
