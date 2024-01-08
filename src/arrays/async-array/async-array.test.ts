import { sleep } from '../../functions';
import { asyncArray } from './async-array';

const measureTime = async (fn: Function) => {
	const startTime = Date.now();
	await fn();
	return Date.now() - startTime;
};

const itemDelay = 20;
const iterable = [
	Promise.resolve(1),
	2,
	new Promise<3>((resolve, reject) => sleep(itemDelay).then(() => resolve(3))),
	new Promise<4>((resolve, reject) => sleep(itemDelay / 2).then(() => resolve(4))),
];

describe('async-array', () => {
	const duration = 50;
	const expectedTime = (iterable.length + 2) * duration + itemDelay + itemDelay / 2;

	describe('forEach', () => {
		it('Serially runs a callback function for an array of values/promises', async () => {
			let result = '';
			let returnValue;

			const actualTime = await measureTime(async () => {
				returnValue = await asyncArray(iterable).forEach(async (item, index) => {
					await sleep(duration);
					result += `${item}`;
				});
			});

			expect(returnValue).toBeUndefined();
			expect(result).toBe('1234');
			expect(Math.abs(expectedTime - actualTime)).toBeLessThan(duration);
		});
	});

	describe('map', () => {
		it('Concurrently runs a callback function for an array of values/promises and returns the result', async () => {
			const result = await asyncArray(iterable).map(async (item, index) => {
				await sleep(duration * index);
				return item;
			});

			expect(result).toStrictEqual([1, 2, 3, 4]);
		});
	});

	describe('reduce / reduceRight', () => {
		it('Serially reduces an array', async () => {
			const actualTime = await measureTime(async () => {
				const results = await asyncArray(iterable).reduce(async (acc, curr) => {
					await sleep(duration);
					return acc + curr;
				}, '0');

				expect(results).toBe('01234');
			});

			expect(Math.abs(expectedTime - actualTime)).toBeLessThan(duration);
		});

		it('Serially reduces an array from right to left', async () => {
			const actualTime = await measureTime(async () => {
				const results = await asyncArray(iterable).reduceRight(async (acc, curr) => {
					await sleep(duration);
					return acc + curr;
				}, '5');

				expect(results).toBe('54321');
			});

			expect(Math.abs(expectedTime - actualTime)).toBeLessThan(duration);
		});
	});
});
