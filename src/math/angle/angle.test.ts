import { angle } from './angle';

describe('angle', () => {
	it('Returns the angle between two points using object notation', () => {
		expect(angle({ x: 3, y: 3 }, { x: 3, y: 3 })).toBe(0);
		expect(angle({ x: 3, y: 3 }, { x: 4, y: 4 })).toBe(45);
		expect(angle({ x: 3, y: 3 }, { x: 4, y: 3 })).toBe(90);
		expect(angle({ x: 3, y: 3 }, { x: 4, y: 2 })).toBe(135);
		expect(angle({ x: 3, y: 3 }, { x: 3, y: 2 })).toBe(180);
		expect(angle({ x: 3, y: 3 }, { x: 2, y: 2 })).toBe(225);
		expect(angle({ x: 3, y: 3 }, { x: 2, y: 3 })).toBe(270);
		expect(angle({ x: 3, y: 3 }, { x: 2, y: 4 })).toBe(315);
	});

	it('Returns the angle between two points using array notation', () => {
		expect(angle([3, 3], [3, 3])).toBe(0);
		expect(angle([3, 3], [4, 4])).toBe(45);
		expect(angle([3, 3], [4, 3])).toBe(90);
		expect(angle([3, 3], [4, 2])).toBe(135);
		expect(angle([3, 3], [3, 2])).toBe(180);
		expect(angle([3, 3], [2, 2])).toBe(225);
		expect(angle([3, 3], [2, 3])).toBe(270);
		expect(angle([3, 3], [2, 4])).toBe(315);
	});

	it('Returns the angle between two points described by separate `x` and `y` coordinates', () => {
		expect(angle(3, 3, 3, 3)).toBe(0);
		expect(angle(3, 3, 4, 4)).toBe(45);
		expect(angle(3, 3, 4, 3)).toBe(90);
		expect(angle(3, 3, 4, 2)).toBe(135);
		expect(angle(3, 3, 3, 2)).toBe(180);
		expect(angle(3, 3, 2, 2)).toBe(225);
		expect(angle(3, 3, 2, 3)).toBe(270);
		expect(angle(3, 3, 2, 4)).toBe(315);
	});

	it('Returns `null` in case of invalid input', () => {
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(angle('1')).toBeNull();
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(angle([1, 1, 1, 2, 2])).toBeNull();
		/* @ts-expect-error -- Edge case for runtime usage */
		expect(angle(null)).toBeNull();
	});
});
