import { assert, configureAssert } from './assert';
import { createConfiguration } from './assert.utils';

const createLog = () => {
	const history: string[] = [];
	const log = (message: string) => history.push(message);
	const clear = () => {
		while (history.length) { history.pop(); }
	};
	return { history, log, clear };
};
const { log, clear, history } = createLog();

describe('assert', () => {
	beforeAll(() => {
		configureAssert({
			errorReporter: (failureType, error, message, props) => {
				log(`ERROR: ${failureType}, ${message ?? ''}: ${props ? JSON.stringify(props) : ''}`);
			},
			warningReporter: (failureType, message, props) => {
				log(`WARNING: ${failureType}, ${message ?? ''}: ${props ? JSON.stringify(props) : ''}`);
			},
		});
	});

	beforeEach(() => clear());

	describe('hard (default)', () => {
		it(`Doesn't throw for non-falsy values`, () => {
			expect(() => assert(true)).not.toThrow();
			expect(() => assert('')).not.toThrow();
			expect(() => assert([])).not.toThrow();
			expect(() => assert({})).not.toThrow();
			expect(() => assert(0)).not.toThrow();
			expect(() => assert(/test/)).not.toThrow();
			expect(() => assert(new Set())).not.toThrow();
		});

		it('Throws for `false`, `null` and `undefined` values', () => {
			expect(() => assert(false)).toThrow();
			expect(() => assert(null)).toThrow();
			expect(() => assert(undefined)).toThrow();
		});

		it('Calls ErrorReporter if failed', () => {
			try {
				assert(false);
			} catch {}

			expect(history[0]).toContain('ERROR');
			expect(history).toHaveLength(1);

			try {
				assert(null);
			} catch {}

			expect(history[1]).toContain('ERROR');
			expect(history).toHaveLength(2);
		});
	});

	describe('soft', () => {
		it('Returns `false` for `false`, `null` and `undefined` values given', () => {
			expect(assert.soft(false)).toBe(false);
			expect(assert.soft(null)).toBe(false);
			expect(assert.soft(undefined)).toBe(false);
		});

		it('Calls WarningReported if failed', () => {
			assert.soft(false);

			expect(history[0]).toContain('WARNING');
			expect(history).toHaveLength(1);

			assert.soft(false);

			expect(history[1]).toContain('WARNING');
			expect(history).toHaveLength(2);
		});

		it('Returns the proper value if any non-falsy value given', () => {
			expect(assert.soft(true)).toBe(true);
			expect(assert.soft('')).toBe('');
			expect(assert.soft([])).toStrictEqual([]);
			expect(assert.soft({})).toStrictEqual({});
			expect(assert.soft(0)).toBe(0);
			expect(assert.soft(/test/)).toStrictEqual(/test/);
			expect(assert.soft(new Set())).toStrictEqual(new Set());
		});
	});

	describe('default formatter messages', () => {
		it('Boolean assertion fails with proper message', () => {
			expect(() => assert(false)).toThrow('Assert condition failed');
		});

		it('Non-boolean assertion fails with proper message', () => {
			expect(() => assert(null)).toThrow('Assert value not undefined/null failed');
		});

		it('The error text respects custom developer message', () => {
			expect(() => assert(null, 'Custom!')).toThrow('Custom!');
		});

		it('The error text respects custom developer props', () => {
			expect(() => assert(null, '', { id: 5 })).toThrow('"id":5');
			expect(() => assert(null, '', () => ({ id: 5 }))).toThrow('"id":5');
		});
	});
});

describe('configureAssert', () => {
	beforeEach(() => {
		configureAssert(createConfiguration());
	});

	it('Can use custom formatter for an error message', () => {
		configureAssert({
			formatter: () => 'Fully custom',
		});

		expect(() => assert(false)).toThrow('Fully custom');
	});

	it('Can use custom ErrorCreator for an error message', () => {
		configureAssert({
			errorCreator: () => new Error('Custom error creator'),
		});

		expect(() => assert(false)).toThrow('Custom error creator');
	});
});
