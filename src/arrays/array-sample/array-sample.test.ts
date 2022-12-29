/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable jest/no-conditional-in-test */
import { randomInteger } from '../../numbers';
import { deepEqual } from '../../objects';
import { arrayOfLength } from '../array-of-length/array-of-length';
import { arraySample } from './array-sample';

const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const runTimes = (times: number, fn: Function) => {
	return arrayOfLength(times).reduce<any[]>((acc, curr) => {
		acc.push(fn());
		return acc;
	}, []);
};

describe('array-sample', () => {
	it('Returns undefined for any invalid input', () => {
		expect(arraySample([])).toBeUndefined();
		/* @ts-expect-error -- Edge case */
		expect(arraySample(123)).toBeUndefined();
		/* @ts-expect-error -- Edge case */
		expect(arraySample(123, -1)).toBeUndefined();
		/* @ts-expect-error -- Edge case */
		expect(arraySample([1, 2, 3], true)).toBeUndefined();
		/* @ts-expect-error -- Edge case */
		expect(arraySample()).toBeUndefined();
	});

	it('Returns the random element from an array', () => {
		const runs = runTimes(1000, () => input.includes(arraySample(input)));

		expect(runs).not.toContain(false);
	});

	it('Returns `size` random elements from an array (less elements than an array contains)', () => {
		const runs = runTimes(1000, () => {
			const length = randomInteger(2, input.length - 1);
			const sample = arraySample(input, length);
			return sample.length === length && sample.every((el: any) => input.includes(el));
		});

		expect(runs).not.toContain(false);
	});

	it('Returns all elements from an array if `size` argument is greater than an array length', () => {
		const runs = runTimes(1000, () => {
			const sample = arraySample(input, 999);
			return sample.length === input.length && deepEqual(sample.sort(), input.sort());
		});

		expect(runs).not.toContain(false);
	});

	it('Returns `size` elements from an array if `size` argument is greater than an array length and `oversize` argument is `true`', () => {
		const runs = runTimes(1000, () => {
			const LENGTH = 20;
			const sample = arraySample(input, LENGTH, true);
			return sample.length === LENGTH;
		});

		expect(runs).not.toContain(false);
	});
});
