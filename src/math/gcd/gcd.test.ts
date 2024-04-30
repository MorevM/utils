import { gcd } from './gcd';

describe('gcd', () => {
	it('Returns `null` in case of invalid input', () => {
		expect(gcd(2)).toBeNull();
		expect(gcd(2.1, 4, 6)).toBeNull();
		expect(gcd(2, 4, NaN)).toBeNull();
		expect(gcd(2, 4, Infinity)).toBeNull();
		expect(gcd([])).toBeNull();
		expect(gcd([2])).toBeNull();
		expect(gcd([2, Math.PI])).toBeNull();
		expect(gcd([2, 4, Infinity])).toBeNull();
		expect(gcd([2, 4, NaN])).toBeNull();
	});

	it('Computes the greatest common divisor of values that less than Math.MAX_SAFE_INTEGER', () => {
		expect(gcd(0, 0)).toBe(0);
		expect(gcd([0, 0])).toBe(0);
		expect(gcd(1, 0)).toBe(1);
		expect(gcd([1, 0])).toBe(1);
		expect(gcd(0, 1)).toBe(1);
		expect(gcd([0, 1])).toBe(1);
		expect(gcd(4, 6)).toBe(2);
		expect(gcd(4, -6)).toBe(2);
		expect(gcd(15, 20)).toBe(5);
		expect(gcd(35, -21)).toBe(7);
		expect(gcd(35, -22)).toBe(1);
		//
		expect(gcd(4, 8, 16)).toBe(4);
		expect(gcd([4, 8, 16])).toBe(4);
		expect(gcd(25, -45, 95)).toBe(5);
		expect(gcd(1500, 750, 150000, 625)).toBe(125);
		expect(gcd([1500, 750, 150000, 625])).toBe(125);
	});

	it('Computes the greatest common divisor of values that exceed the max safe Math.MAX_SAFE_INTEGER', () => {
		const a = 2 ** 100;
		const b = 2 ** 53;

		expect(gcd(a, 0)).toBe(a);
		expect(gcd(b, 0)).toBe(b);

		expect(gcd(a, b)).toBe(9007199254740992);
		expect(gcd(a, 73453)).toBe(1);
		expect(gcd(a, 3491832)).toBe(8);
		expect(gcd(3491832, a)).toBe(8);
	});
});
