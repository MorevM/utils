import { isObjectsEqualJSON } from './is-objects-equal-json';

describe('is-objects-equal-json', () => {
	it('Returns `true` if given objects are identical', () => {
		const o1 = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const o2 = {
			...o1,
		};

		const result = isObjectsEqualJSON(o1, o2);

		expect(result).toBe(true);
	});

	it('Returns `true` if given objects are identical, but its properties placed in different order', () => {
		const o1 = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const o2 = {
			baz: 3,
			bar: 2,
			foo: 1,
		};

		const result = isObjectsEqualJSON(o1, o2);

		expect(result).toBe(true);
	});

	it('Returns `false` if given objects are not identical', () => {
		const o1 = {
			foo: 1,
			bar: 2,
			baz: 3,
		};
		const o2 = {
			foo: 1,
			bar: 2,
		};

		const result = isObjectsEqualJSON(o1, o2);

		expect(result).toBe(false);
	});
});
