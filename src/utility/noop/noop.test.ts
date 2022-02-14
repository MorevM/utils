import { noop } from './noop';

describe('noop', () => {
	it('Returns empty function', () => {
		expect(typeof noop).toBe('function');
		expect(typeof noop()).toBe('undefined');
	});
});
