import { isSymbol } from './is-symbol';

const symbol = Symbol(1);

describe('is-symbol', () => {
	it('Returns `true` if a given value is a symbol', () => {
		expect(isSymbol(symbol)).toBe(true);
	});

	it('Returns `false` if a given value is not a symbol', () => {
		expect(isSymbol(null)).toBe(false);
		expect(isSymbol(null)).toBe(false);
		expect(isSymbol(undefined)).toBe(false);
		expect(isSymbol(NaN)).toBe(false);
		expect(isSymbol(Infinity)).toBe(false);
		expect(isSymbol(new Date(2222, 12, 22))).toBe(false);
		expect(isSymbol(new RegExp('/foo/', 'g'))).toBe(false);
		expect(isSymbol(100n)).toBe(false);
		expect(isSymbol({})).toBe(false);
		expect(isSymbol(123)).toBe(false);
		expect(isSymbol(false)).toBe(false);
		expect(isSymbol(true)).toBe(false);
	});
});
