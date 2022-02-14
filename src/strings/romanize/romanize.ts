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

export const romanize = (num: number) => Object.entries(numerals)
	.reduce((acc, [key, value]) => {
		// eslint-disable-next-line no-bitwise
		acc += key.repeat(num / value >>> 0);
		num %= value;
		return acc;
	}, '');
