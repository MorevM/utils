import { isInteger } from '../../guards';
import { randomInteger } from './random-integer';

describe('random-integer', () => {
	it('Returns the random integer with no arguments', () => {
		const result = callTimes(1000, () => randomInteger());

		expect(result.every((value) => isInteger(value))).toBe(true);
	});

	it('Returns the random integer between a given minimum and maximum value (including)', () => {
		const [min, max] = [10, 100];
		const result = callTimes(1000, () => randomInteger(min, max));

		expect(result.every((value) => isInteger(value))).toBe(true);
		expect(result.every((value) => value >= min)).toBe(true);
		expect(result.every((value) => value <= max)).toBe(true);
	});
});
