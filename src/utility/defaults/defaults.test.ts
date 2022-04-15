/* eslint-disable jest/no-conditional-in-test */
import { defaults, createDefaults } from './defaults';

const defaultObj = {
	a: 'a',
	b: {
		'b.a': true,
		'b.b': {
			'b.b.a': [1, 2, 3],
			'b.b.b': 'b.b.b',
		},
		'b.c': 'b.c',
	},
	c: 1,
};

const input = {
	a: 'a',
	b: {
		'b.a': false,
		'b.b': {
			'b.b.a': [4, 5, 6],
			'b.b.b': 'b.b.b',
			'b.b.c': 1,
		},
		'b.c': 'new b.c',
	},
	c: 2,
	d: 'd',
};

describe('defaults', () => {
	it('Returns the object which is a given objects being recursively merged', () => {
		const expected = {
			a: 'a',
			b: {
				'b.a': false,
				'b.b': {
					'b.b.a': [4, 5, 6],
					'b.b.b': 'b.b.b',
					'b.b.c': 1,
				},
				'b.c': 'new b.c',
			},
			c: 2,
			d: 'd',
		};

		expect(defaults(defaultObj, input)).toStrictEqual(expected);
	});

	it('Can use custom merger function', () => {
		const customDefaults = createDefaults((obj, key, value, namespace) => {
			if (namespace === 'b.b.b' && key === 'b.b.b') {
				obj[key] = 666 as any;
				return true;
			}

			if (namespace === 'b.b.b' && key === 'b.b.a') {
				obj[key] = [...obj[key], ...value] as any;
				return true;
			}

			if (namespace === '' && key === 'c') {
				obj[key] = 3 as any;
				return true;
			}

			return false;
		});

		const expected = {
			a: 'a',
			b: {
				'b.a': false,
				'b.b': {
					'b.b.a': [1, 2, 3, 4, 5, 6],
					'b.b.b': 666,
					'b.b.c': 1,
				},
				'b.c': 'new b.c',
			},
			c: 3,
			d: 'd',
		};

		expect(customDefaults(defaultObj, input)).toStrictEqual(expected);
	});
});
