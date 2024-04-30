/* eslint-disable no-bitwise -- Used intentionally for performance, details https://github.com/compute-io/gcd/pull/2 */
/* eslint-disable func-style -- Much better to work with overloads */

// Just a custom implementation of https://github.com/compute-io/gcd
// written in a modern syntax with TS types included and more easy-to-read form.

import { isArray, isInteger } from '../../guards';

const _gcdBinary = (a: number, b: number) => {
	let factor = 1;

	while (a % 2 === 0 && b % 2 === 0) {
		[a, b, factor] = [a / 2, b / 2, factor * 2];
	}

	// Reduce `a` to an odd number
	while (a % 2 === 0) a = a / 2;

	// Henceforth, `a` is always odd
	while (b) {
		// Remove all factors of 2 in `b`, as they are not common...
		while (b % 2 === 0) b = b / 2;
		// `a` and `b` are both odd.
		// Swap values such that `b` is the larger of the two values,
		// and then set `b` to the difference (which is even)
		if (a > b) [a, b] = [b, a];

		b = b - a;
	}

	return factor * a;
};

const _gcdBitwise = (a: number, b: number) => {
	let factor = 0;

	while ((a & 1) === 0 && (b & 1) === 0) {
		a >>>= 1;
		b >>>= 1;
		factor++;
	}

	while ((a & 1) === 0) a >>>= 1;

	while (b) {
		while ((b & 1) === 0) b >>>= 1;
		if (a > b) [a, b] = [b, a];
		b = b - a;
	}

	return a << factor;
};

const _gcd = (a: number, b: number) => {
	if (a === 0) return b;
	if (b === 0) return a;

	[a, b] = [Math.abs(a), Math.abs(b)];

	const mode = a < Number.MAX_SAFE_INTEGER && b < Number.MAX_SAFE_INTEGER
		? 'bitwise'
		: 'binary';

	return mode === 'binary' ? _gcdBinary(a, b) : _gcdBitwise(a, b);
};

/**
 * Computes the greatest common divisor (gcd) of two or more integers.
 *
 * @param   integers   The list of integers.
 *
 * @returns            Greatest common divisor of given integers, or `null` in case of invalid input.
 */
export function gcd(...integers: number[]): number | null;

/**
 * Computes the greatest common divisor (gcd) of two or more integers.
 *
 * @param   integers   The array of integers.
 *
 * @returns            Greatest common divisor of given integers, or `null` in case of invalid input.
 */
export function gcd(integers: number[]): number | null;
export function gcd(...args: number[] | [number[]]) {
	const numbers = (isArray(args[0]) ? args[0] : args) as number[];
	const { length } = numbers;
	if (length < 2) return null;
	if (numbers.some((number) => !isInteger(number))) return null;

	return numbers.reduce((acc, b) => _gcd(acc, b));
}
