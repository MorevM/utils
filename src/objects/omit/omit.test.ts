import { omit, omitMutable } from './omit';

describe('omit', () => {
	it('Returns empty object in case of nullish input', () => {
		/* @ts-expect-error -- Edge case */
		const nullResult = omit(null, 'foo', 'bar');
		/* @ts-expect-error -- Edge case */
		const undefinedResult = omit(undefined, 'foo', 'bar');

		expect(nullResult).toStrictEqual({});
		expect(undefinedResult).toStrictEqual({});
	});

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

describe('omit-mutable', () => {
	it('Returns input as is in case of nullish input', () => {
		/* @ts-expect-error -- Edge case */
		const nullResult = omitMutable(null, 'foo', 'bar');
		/* @ts-expect-error -- Edge case */
		const undefinedResult = omitMutable(undefined, 'foo', 'bar');

		expect(nullResult).toBeNull();
		expect(undefinedResult).toBeUndefined();
	});

	it('Mutates and returns the object without given keys', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = {
			bar: 2,
		};

		const result = omitMutable(input, 'foo', 'baz');

		expect(result).toStrictEqual(expected);
		expect(input).toStrictEqual(expected);
		expect(result).toBe(input);
	});

	it('Returns a given object as is if no keys to remove given', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = { ...input };

		const result = omitMutable(input);

		expect(result).toStrictEqual(expected);
		expect(input).toStrictEqual(expected);
		expect(result).toBe(input);
	});

	it('Returns empty object if all keys of the input object given', () => {
		const input = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const expected = {};

		const result = omitMutable(input, 'foo', 'bar', 'baz');

		expect(result).toStrictEqual(expected);
		expect(input).toStrictEqual(expected);
		expect(result).toBe(input);
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
		const result = omitMutable(input, 'bar', 'some');

		expect(result).toStrictEqual(expected);
		expect(input).toStrictEqual(expected);
		expect(result).toBe(input);
	});
});
