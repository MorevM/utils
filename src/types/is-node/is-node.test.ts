import { isNode } from './is-node';

describe('is-node', () => {
	it('Returns `true` if a given value is a DOM element node', () => {
		expect(isNode(document.body)).toBe(true);
	});

	it('Returns `true` if a given value is a text node', () => {
		expect(isNode(document.createTextNode('foo'))).toBe(true);
	});

	it('Returns `false` if a given value is not a node', () => {
		expect(isNode('foo')).toBe(false);
		expect(isNode({})).toBe(false);
	});

	it('Returns `false` if a given value is nullish', () => {
		expect(isNode(null)).toBe(false);
		expect(isNode(undefined)).toBe(false);
	});
});
