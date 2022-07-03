/* eslint-disable @typescript-eslint/naming-convention */
const numerals = {
	M: 1000,
	CM: 900,
	D: 500,
	CD: 400,
	C: 100,
	XC: 90,
	L: 50,
	XL: 40,
	X: 10,
	IX: 9,
	V: 5,
	IV: 4,
	I: 1,
};

/**
 * Retrieves Roman representation of given integer number.
 *
 * @param   num   Integer value to transform to Roman notation
 *
 * @returns         Roman representation of given number
 */
export const romanize = (num: number): string => Object.entries(numerals)
	.reduce((acc, [key, value]) => {
		acc += key.repeat(num / value >>> 0); // eslint-disable-line no-bitwise
		num %= value;
		return acc;
	}, '');
