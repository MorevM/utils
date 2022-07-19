import { pick } from './pick';

describe('pick', () => {
	it('Returns the object with only keys specified', () => {
		expect(pick({ a: 1, b: 2, c: 3 }, 'a')).toStrictEqual({ a: 1 });
		expect(pick({ a: 1, b: 2, c: 3 }, 'a', 'c')).toStrictEqual({ a: 1, c: 3 });
	});

	it('Returns an empty object as is if no specified keys in it', () => {
		/* @ts-expect-error -- Edge case */
		expect(pick({ a: 1, b: 2, c: 3 }, 'd')).toStrictEqual({});
	});

	it('Works correctly with empty input', () => {
		/* @ts-expect-error -- Edge case */
		expect(pick({}, 'd', 'e')).toStrictEqual({});
	});

	it('Works correctly with repeating keys', () => {
		expect(pick({ a: 1, b: 2 }, 'a', 'a')).toStrictEqual({ a: 1 });
	});
});
