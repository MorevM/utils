import { randomFloat } from './random-float';

const getPrecision = (num: number) => {
	if (!Number.isFinite(num)) return 0;
	let i = 1;
	let j = 0;
	while (Math.round(num * i) / i !== num) { i *= 10; j++; }
	return j;
};

const TIMES = 1000;

describe('random-float', () => {
	it('Returns the random float between a given minimum and maximum value (including)', () => {
		const suites = [
			{ min: -1, max: 0 },
			{ min: -999999, max: 999999, precision: 2 },
			{ min: 10, max: 10.01, precision: 5 },
		];

		expect.assertions(suites.length * 5 * TIMES);

		suites.forEach(({ min, max, precision }) => {
			for (let i = 0; i < TIMES; i++) {
				const random = randomFloat(min, max, precision);
				const calculatedPrecision = getPrecision(random);

				expect(typeof random).toBe('number');
				expect(random).not.toBeNaN();
				expect(random).toBeGreaterThanOrEqual(min);
				expect(random).toBeLessThanOrEqual(max);

				expect(precision === undefined || calculatedPrecision <= precision).toBe(true);
			}
		});
	});
});
