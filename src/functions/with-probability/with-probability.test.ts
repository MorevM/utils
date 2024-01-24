/* eslint-disable jest/no-conditional-in-test -- No way to test without "conditionals" */
import { withProbability } from './with-probability';

const TESTS_COUNT = 10000;
const ACCURACY = .02;

const adjustWithAccuracy = (amount: number, probability: number) =>
	amount >= probability - ACCURACY && amount <= probability + ACCURACY;

const toAmount = (results: any[], value: any) =>
	results.filter((item) => item === value).length / TESTS_COUNT;

const [primary, secondary] = [1, 0];

describe('with-probability', () => {
	describe('Primary value', () => {
		it('Returns the primary value if the first argument is `1`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(1, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(1);
			expect(secondaryAmount).toBe(0);
		});

		it('Returns the primary value if the first argument is `100`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(100, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(1);
			expect(secondaryAmount).toBe(0);
		});

		it('Returns the primary value with if the first argument is more than `100`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(10000, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(1);
			expect(secondaryAmount).toBe(0);
		});

		it('Returns the primary value if the first argument is `100%`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability('100%', primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(1);
			expect(secondaryAmount).toBe(0);
		});

		it('Returns the primary value if the first argument is more than `100%`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability('10000%', primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(1);
			expect(secondaryAmount).toBe(0);
		});

		it('Can obtain a primary value from a function', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(1, () => primary, secondary));

			expect(results.every((result) => result === 1)).toBe(true);
		});
	});

	describe('Secondary value', () => {
		it('Returns the secondary value if the first argument is `0`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(0, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(0);
			expect(secondaryAmount).toBe(1);
		});

		it('Returns the secondary value if the first argument is negative number', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(0, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(0);
			expect(secondaryAmount).toBe(1);
		});

		it('Returns the secondary value if the first argument is `0%`', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability('0%', primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(0);
			expect(secondaryAmount).toBe(1);
		});

		it('Returns the secondary value if the first argument is a string form of negative percentage', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability('-10%', primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(primaryAmount).toBe(0);
			expect(secondaryAmount).toBe(1);
		});

		it('Can obtain a secondary value from a function', () => {
			const results = callTimes(TESTS_COUNT, () => withProbability(0, () => primary, () => secondary));

			expect(results.every((result) => result === 0)).toBe(true);
		});
	});

	describe('Mixed', () => {
		it('Returns the primary value with given probability', () => {
			const probability = .8;
			const results = callTimes(TESTS_COUNT, () => withProbability(probability, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(adjustWithAccuracy(primaryAmount, probability)).toBe(true);
			expect(adjustWithAccuracy(secondaryAmount, 1 - probability)).toBe(true);
		});

		it('Counts the `probability` as a percentage value if it is greater than `1`', () => {
			const probability = 20;
			const results = callTimes(TESTS_COUNT, () => withProbability(probability, primary, secondary));

			const primaryAmount = toAmount(results, primary);
			const secondaryAmount = toAmount(results, secondary);

			expect(adjustWithAccuracy(primaryAmount, probability / 100)).toBe(true);
			expect(adjustWithAccuracy(secondaryAmount, 1 - (probability / 100))).toBe(true);
		});

		it('Works with nested calls', () => {
			const results = callTimes(
				TESTS_COUNT, () => withProbability(.5, 1, withProbability(.5, () => withProbability(.1, 2, 3), 4)),
			);

			const amount1 = toAmount(results, 1);
			const amount2 = toAmount(results, 2);
			const amount3 = toAmount(results, 3);
			const amount4 = toAmount(results, 4);

			expect(adjustWithAccuracy(amount1, .5)).toBe(true);
			expect(adjustWithAccuracy(amount2, .025)).toBe(true);
			expect(adjustWithAccuracy(amount3, .25 - .025)).toBe(true);
			expect(adjustWithAccuracy(amount4, .25)).toBe(true);
		});
	});
});
