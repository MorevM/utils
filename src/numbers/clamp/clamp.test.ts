import { clamp } from './clamp';

describe('clamp', () => {
	it('Returns the average value from a given values', () => {
		expect(clamp(1, 2, 3)).toBe(2);
	});

	it('Works correctly with negative values', () => {
		expect(clamp(-1, -2, -3)).toBe(-2);
	});

	it('Works correctly with decimal values', () => {
		expect(clamp(1.1, 1.2, 1.3)).toBe(1.2);
	});

	it('Works correctly if all given values are the same', () => {
		expect(clamp(2, 2, 2)).toBe(2);
	});
});
