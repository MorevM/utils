import { sleep } from '../../functions';
import { arrayOfLength } from '../array-of-length/array-of-length';
import { asyncArray } from './async-array';

const itemDelay = 20;
const createIterable = () => [
	Promise.resolve(1),
	2,
	new Promise<3>((resolve, reject) => sleep(itemDelay).then(() => resolve(3))),
	new Promise<4>((resolve, reject) => sleep(itemDelay / 2).then(() => resolve(4))),
];

describe(asyncArray, () => {
	const duration = 50;

	beforeEach(() => vi.useFakeTimers());

	afterEach(() => vi.useRealTimers());

	describe('forEach', () => {
		it('Serially runs a callback function for an array of values/promises', async () => {
			let result = '';
			const started: number[] = [];
			const completed: number[] = [];

			const pending = asyncArray(createIterable())
				.forEach(async (item, index) => {
					started.push(index);
					await sleep(duration);
					completed.push(index);
					result += `${item}`;
				});

			await vi.advanceTimersByTimeAsync(itemDelay);

			expect(started).toStrictEqual([0]);
			expect(completed).toStrictEqual([]);

			for (const index of [1, 2, 3]) {
				// eslint-disable-next-line no-await-in-loop -- This is fine here
				await vi.advanceTimersByTimeAsync(duration);

				expect(started).toStrictEqual([0, ...arrayOfLength(index, (i) => i + 1)]);
				expect(completed).toStrictEqual(arrayOfLength(index, (i) => i));
			}

			await vi.advanceTimersByTimeAsync(duration);
			const returnValue = await pending;

			expect(returnValue).toBeUndefined();
			expect(result).toBe('1234');
			expect(completed).toStrictEqual([0, 1, 2, 3]);
		});
	});

	describe('map', () => {
		it('Concurrently runs a callback function for an array of values/promises and returns the result', async () => {
			const started: number[] = [];
			const completed: number[] = [];

			const pending = asyncArray(createIterable())
				.map(async (item, index) => {
					started.push(index);
					await sleep(duration * index);
					completed.push(index);
					return item;
				});

			await vi.advanceTimersByTimeAsync(itemDelay);

			expect(started).toStrictEqual([0, 1, 2, 3]);
			expect(completed).toStrictEqual([]);

			await vi.advanceTimersByTimeAsync(duration);

			expect(completed).toStrictEqual([0, 1]);

			await vi.advanceTimersByTimeAsync(duration);

			expect(completed).toStrictEqual([0, 1, 2]);

			await vi.advanceTimersByTimeAsync(duration);
			const result = await pending;

			expect(result).toStrictEqual([1, 2, 3, 4]);
			expect(completed).toStrictEqual([0, 1, 2, 3]);
		});
	});

	describe('reduce / reduceRight', () => {
		it('Serially reduces an array', async () => {
			const calls: string[] = [];

			const pending = asyncArray(createIterable())
				.reduce(async (acc, current) => {
					calls.push(`${acc}:${current}`);
					await sleep(duration);
					return acc + current;
				}, '0');

			await vi.advanceTimersByTimeAsync(itemDelay);

			expect(calls).toStrictEqual(['0:1']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['0:1', '01:2']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['0:1', '01:2', '012:3']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['0:1', '01:2', '012:3', '0123:4']);

			await vi.advanceTimersByTimeAsync(duration);
			const results = await pending;

			expect(results).toBe('01234');
		});

		it('Serially reduces an array from right to left', async () => {
			const calls: string[] = [];

			const pending = asyncArray(createIterable())
				.reduceRight(async (acc, current) => {
					calls.push(`${acc}:${current}`);
					await sleep(duration);
					return acc + current;
				}, '5');

			await vi.advanceTimersByTimeAsync(itemDelay);

			expect(calls).toStrictEqual(['5:4']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['5:4', '54:3']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['5:4', '54:3', '543:2']);

			await vi.advanceTimersByTimeAsync(duration);

			expect(calls).toStrictEqual(['5:4', '54:3', '543:2', '5432:1']);

			await vi.advanceTimersByTimeAsync(duration);
			const results = await pending;

			expect(results).toBe('54321');
		});
	});
});
