/* eslint-disable jest/no-conditional-in-test */
import { safeJsonParse } from './safe-json-parse';

const WRONG_JSON_STRING = '{"a":  "b}';
const TEST_OBJECT = { a: 1, b: [1, 2, 3], c: { d: 'e' } };

describe('safe-json-parse', () => {
	it('Returns `null` for invalid input', () => {
		expect(safeJsonParse(null)).toBeNull();
		expect(safeJsonParse(undefined)).toBeNull();
		expect(safeJsonParse(1)).toBeNull();
		expect(safeJsonParse(1n)).toBeNull();
		expect(safeJsonParse(true)).toBeNull();
		expect(safeJsonParse(false)).toBeNull();
		expect(safeJsonParse(NaN)).toBeNull();
		expect(safeJsonParse([])).toBeNull();
		expect(safeJsonParse({})).toBeNull();
		expect(safeJsonParse(new Date())).toBeNull();
		expect(safeJsonParse(/test/g)).toBeNull();
		expect(safeJsonParse(WRONG_JSON_STRING)).toBeNull();
	});

	it('Returns a parsed JSON string with valid input', () => {
		expect(safeJsonParse(JSON.stringify(TEST_OBJECT))).toStrictEqual(TEST_OBJECT);
	});

	it('Returns a parsed JSON string with valid input using custom reviver', () => {
		expect(safeJsonParse('{ "a": "b", "c": 1 }', (key, value) => {
			if (key === 'a') return 'a';
			if (key === 'c') return value + 1;
			return value;
		})).toStrictEqual({ a: 'a', c: 2 });
	});
});
