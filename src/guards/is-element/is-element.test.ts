import { isElement } from './is-element';

describe('is-element', () => {
	it('Returns `true` if a given value is a DOM element node', () => {
		expect(isElement(document.body)).toBe(true);
	});

	it('Returns `false` if a given value is not a DOM element node', () => {
		expect(isElement(document.createTextNode('foo'))).toBe(false);
	});

	it('Returns `false` if a given value is not an Element', () => {
		expect(isElement('foo')).toBe(false);
		expect(isElement({})).toBe(false);
	});

	it('Returns `false` if a given value is nullish', () => {
		expect(isElement(null)).toBe(false);
		expect(isElement(undefined)).toBe(false);
	});
});
