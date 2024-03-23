import { isInteger } from '../../guards';
import { randomInteger } from './random-integer';

describe('random-integer', () => {
	it('Returns the random integer with no arguments', { repeats: 10000 }, () => {
		expect(isInteger(randomInteger())).toBe(true);
	});

	it('Returns the random integer between a given minimum and maximum value (including)', { repeats: 10000 }, () => {
		const [min, max] = [10, 100];

		expect(isInteger(randomInteger(min, max))).toBe(true);
		expect(randomInteger(min, max)).toBeGreaterThanOrEqual(min);
		expect(randomInteger(min, max)).toBeLessThanOrEqual(max);
	});
});
