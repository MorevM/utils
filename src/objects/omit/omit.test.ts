import { omit } from './omit';

describe('omit', () => {
	it('Returns the object which is a given object without a given keys', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = {
			bar: 2,
		};

		const result = omit(input, 'foo', 'baz');

		expect(result).toStrictEqual(expected);
	});

	it('Returns a given object as is if no keys to remove given', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = { ...input };

		const result = omit(input);

		expect(result).toStrictEqual(expected);
	});

	it('Returns empty object if all keys of the input object given', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = {};

		const result = omit(input, 'foo', 'bar', 'baz');

		expect(result).toStrictEqual(expected);
	});

	it('Works correctly if some of a given keys does not exists in a given object', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = {
			foo: 1,
			baz: 3,
		};

		/* @ts-expect-error -- Edge case */
		const result = omit(input, 'bar', 'some');

		expect(result).toStrictEqual(expected);
	});
});
