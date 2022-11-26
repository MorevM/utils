import { isEmpty } from './is-empty';

describe('is-empty', () => {
	it('Returns `true` if a given value is a `null`', () => {
		expect(isEmpty(null)).toBe(true);
	});

	it('Returns `true` if a given value is an `undefined`', () => {
		expect(isEmpty(undefined)).toBe(true);
	});

	it('Returns `true` if a given value is a `false`', () => {
		expect(isEmpty(false)).toBe(true);
	});

	it('Returns `true` if a given value is a `NaN`', () => {
		expect(isEmpty(NaN)).toBe(true);
	});

	it('Returns `true` if a given value is a `0`', () => {
		expect(isEmpty(0)).toBe(true);
	});

	it('Returns `true` if a given value is an empty string', () => {
		expect(isEmpty('')).toBe(true);
	});

	it('Returns `true` if a given value is an empty array', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('Returns `true` if a given value is an empty object', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('Returns `false` if a given value is a string representation of zero', () => {
		expect(isEmpty('0')).toBe(false);
	});

	it('Returns `false` if a given value is not an empty string', () => {
		expect(isEmpty('foo')).toBe(false);
	});

	it('Returns `true` if a given value is an empty Map / Set', () => {
		expect(isEmpty(new Map())).toBe(true);
		expect(isEmpty(new Set())).toBe(true);
	});

	it('Returns `false` if a given value is not an empty Map / Set', () => {
		const map = new Map().set('a', 'a');
		const set = new Set().add('a');

		expect(isEmpty(map)).toBe(false);
		expect(isEmpty(set)).toBe(false);
	});

	it('Returns `true` for empty Nodelist', () => {
		document.body.innerHTML = '';
		document.body.insertAdjacentHTML('beforeend', `<div id="root"></div>`);

		expect(isEmpty(document.querySelectorAll('.foo'))).toBe(true);
	});

	it('Returns `false` for non-empty Nodelist', () => {
		document.body.innerHTML = '';
		document.body.insertAdjacentHTML('beforeend', `<div class="foo"></div>`);

		expect(isEmpty(document.querySelectorAll('.foo'))).toBe(false);
	});

	it('Returns `true` for empty HTMLCollection', () => {
		document.body.innerHTML = '';
		document.body.insertAdjacentHTML('beforeend', `<div id="root"></div>`);

		// eslint-disable-next-line unicorn/prefer-query-selector
		expect(isEmpty(document.querySelectorAll('.foo'))).toBe(true);
	});

	it('Returns `false` for non-empty HTMLCollection', () => {
		document.body.innerHTML = '';
		document.body.insertAdjacentHTML('beforeend', `<div class="foo"></div>`);

		// eslint-disable-next-line unicorn/prefer-query-selector
		expect(isEmpty(document.getElementsByClassName('foo'))).toBe(false);
	});
});
