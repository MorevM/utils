import { randomInteger } from './random-integer';

describe('random-integer', () => {
	it('Returns the random integer between a given minimum and maximum value (including)', () => {
		const min = 10;
		const max = 100;
		const result = randomInteger(min, max);

		expect(typeof result).toBe('number');
		expect(result).not.toBeNaN();
		expect(result).toBeGreaterThanOrEqual(min);
		expect(result).toBeLessThanOrEqual(max);
	});
});
