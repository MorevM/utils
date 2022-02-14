import { defaults } from './defaults';

describe('defaults', () => {
	it('Returns the object which is a given objects being recursively merged', () => {
		const target = {
			'prop-1': 'val-1',
			'prop-2': {
				'prop-2-1': 'val-2-1',
				'prop-2-2': {
					'prop-2-2-1': 'val-2-2-1',
					'prop-2-2-2': 'val-2-2-2',
				},
				'prop-2-3': 'val-2-3',
			},
			'prop-3': 'val-3',
		};

		const source = {
			'prop-2': {
				'prop-2-2': {
					'prop-2-2-1': 'new val-2-2-1',
					'prop-2-2-3': 'new val-2-2-3',
				},
				'prop-2-3': 'new val-2-3',
			},
			'prop-4': {
				'prop-4-1': 'new val-4-1',
				'prop-4-2': 'new val-4-2',
			},
		};

		const expected = {
			'prop-1': 'val-1',
			'prop-2': {
				'prop-2-1': 'val-2-1',
				'prop-2-2': {
					'prop-2-2-1': 'new val-2-2-1',
					'prop-2-2-2': 'val-2-2-2',
					'prop-2-2-3': 'new val-2-2-3',
				},
				'prop-2-3': 'new val-2-3',
			},
			'prop-3': 'val-3',
			'prop-4': {
				'prop-4-1': 'new val-4-1',
				'prop-4-2': 'new val-4-2',
			},
		};

		const result = defaults(target, source);

		expect(result).toStrictEqual(expected);
	});
});
