import { objectKeysCase } from './object-keys-case';

const input = {
	a_a: 1,
	b_b: {
		c_c: {
			d_d: [
				1,
				1,
				[{ e_e: 1 }],
			],
			f_f: {
				g_g: 1,
			},
		},
	},
	c_c: [{ a_a: 1 }],
};

describe('object-keys-case', () => {
	it('Converts all given object keys case to needed case', () => {
		const expected = {
			aA: 1,
			bB: {
				cC: {
					dD: [
						1,
						1,
						[{ eE: 1 }],
					],
					fF: {
						gG: 1,
					},
				},
			},
			cC: [{ aA: 1 }],
		};

		expect(objectKeysCase(input, 'camelCase')).toStrictEqual(expected);
	});

	it('Respects `depth` argument', () => {
		const expected1 = {
			aA: 1,
			bB: {
				c_c: {
					d_d: [
						1,
						1,
						[{ e_e: 1 }],
					],
					f_f: {
						g_g: 1,
					},
				},
			},
			cC: [{ a_a: 1 }],
		};

		const expected2 = {
			aA: 1,
			bB: {
				cC: {
					d_d: [
						1,
						1,
						[{ e_e: 1 }],
					],
					f_f: {
						g_g: 1,
					},
				},
			},
			cC: [{ a_a: 1 }],
		};

		const expected3 = {
			aA: 1,
			bB: {
				cC: {
					dD: [
						1,
						1,
						[{ e_e: 1 }],
					],
					fF: {
						g_g: 1,
					},
				},
			},
			cC: [{ aA: 1 }],
		};

		expect(objectKeysCase(input, 'camelCase', { depth: 1 })).toStrictEqual(expected1);
		expect(objectKeysCase(input, 'camelCase', { depth: 2 })).toStrictEqual(expected2);
		expect(objectKeysCase(input, 'camelCase', { depth: 3 })).toStrictEqual(expected3);
	});

	it('Respects `exclude` argument', () => {
		const expected = {
			aA: 1,
			bB: {
				c_c: {
					dD: [
						1,
						1,
						[{ eE: 1 }],
					],
					fF: {
						gG: 1,
					},
				},
			},
			c_c: [{ aA: 1 }],
		};

		expect(objectKeysCase(input, 'camelCase', { exclude: ['c_c'] })).toStrictEqual(expected);
		expect(objectKeysCase(input, 'camelCase', { exclude: [/c_.*/] })).toStrictEqual(expected);
	});

	it('Respects `excludeBranches` argument', () => {
		const expected = {
			aA: 1,
			bB: {
				cC: {
					d_d: [
						1,
						1,
						[{ e_e: 1 }],
					],
					fF: {
						gG: 1,
					},
				},
			},
			c_c: [{ a_a: 1 }],
		};

		expect(objectKeysCase(input, 'camelCase', { excludeBranches: ['b_b.c_c.d_d', /^c_c/] })).toStrictEqual(expected);
	});

	it('Can work with array of objects', () => {
		expect(
			objectKeysCase([{ a_a: 1 }, { b_b: 1 }], 'camelCase'),
		).toStrictEqual([{ aA: 1 }, { bB: 1 }]);
	});

	it('Returns value as is for non-object and non-array input', () => {
		expect(objectKeysCase(null, 'camelCase')).toBeNull();
		expect(objectKeysCase(true, 'camelCase')).toBe(true);
	});

	it('Correctly works with empty input', () => {
		expect(objectKeysCase({}, 'camelCase')).toStrictEqual({});
		expect(objectKeysCase([], 'camelCase')).toStrictEqual([]);
	});
});
