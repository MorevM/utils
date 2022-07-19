import { inRange } from './in-range';

describe('inRange', () => {
	it('Returns `true` if a given range includes a given value', () => {
		expect(inRange(150, [100, 200])).toBe(true);
	});

	it('Returns `true` if at least one of a given ranges includes a given value', () => {
		expect(inRange(150, [10, 20], [100, 200], [500, 1000])).toBe(true);
	});

	it('Returns `true` if a given value is the bound value', () => {
		expect(inRange(100, [100, 200])).toBe(true);
		expect(inRange(200, [100, 200])).toBe(true);
	});

	it('Returns `false` if no one of a given ranges includes a given value', () => {
		expect(inRange(500, [10, 20], [100, 200])).toBe(false);
	});

	it('Returns `false` if no ranges given', () => {
		expect(inRange(100)).toBe(false);
	});

	it('Returns `true` if a given opened range includes a given value', () => {
		expect(inRange(100, [null, 200])).toBe(true);
		expect(inRange(100, [100, null])).toBe(true);
		expect(inRange(100, [null, 50], [null, 90], [100, null])).toBe(true);
	});

	it('Returns `false` if no one of a given opened ranges includes a given value', () => {
		expect(inRange(220, [null, 200])).toBe(false);
		expect(inRange(90, [100, null])).toBe(false);
		expect(inRange(100, [null, 50], [null, 90], [101, null])).toBe(false);
	});
});
