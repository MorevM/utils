import { compose } from './compose';

describe('compose', () => {
	it('Sequentially applies given functions to a passed value in reverse order', () => {
		const f1 = vi.fn().mockImplementation((str: string): string => `${str}-baz`);
		const f2 = vi.fn().mockImplementation((str: string): string => `${str}-bar`);

		const result = compose(f1, f2)('foo');

		expect(f2).toHaveBeenNthCalledWith(1, 'foo');
		expect(f1).toHaveBeenNthCalledWith(1, 'foo-bar');
		expect(result).toBe('foo-bar-baz');
	});
});
