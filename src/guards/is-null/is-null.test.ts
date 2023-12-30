import { isNull } from './is-null';

describe('is-null', () => {
	it('Returns `true` if a given value is `null`', () => {
		expect(isNull(null)).toBe(true);
	});

	it('Returns `false` if a given value is not `null`', () => {
		expect(isNull(undefined)).toBe(false);
		expect(isNull(false)).toBe(false);
		expect(isNull(NaN)).toBe(false);
		expect(isNull(0)).toBe(false);
		expect(isNull({})).toBe(false);
		expect(isNull('null')).toBe(false);
		expect(isNull(0n)).toBe(false);
		expect(isNull([])).toBe(false);
		expect(isNull(() => {})).toBe(false);
	});
});
