/* eslint-disable sonarjs/no-duplicate-string */
import { formatSlashes } from './format-slashes';

describe('format-slashes', () => {
	it('Returns string without slash duplicates if no arguments passed', () => {
		expect(formatSlashes('')).toBe('');
		expect(formatSlashes('some/long/string/')).toBe('some/long/string/');
		expect(formatSlashes('some\\long\\string\\')).toBe('some\\long\\string\\');
		expect(formatSlashes('/q//some//long//string////')).toBe('/q/some/long/string/');
		expect(formatSlashes('\\q\\\\some\\\\long\\string\\\\')).toBe('\\q\\some\\long\\string\\');
	});

	it('Doesn\'t touch protocol while removing duplicated slashes', () => {
		expect(formatSlashes('https://some.url//path//')).toBe('https://some.url/path/');
	});

	it('Converts slashes if `to` argument is passed', () => {
		expect(formatSlashes('some/long/string/', { to: '/' })).toBe('some/long/string/');
		expect(formatSlashes('some\\long\\string\\', { to: '/' })).toBe('some/long/string/');

		expect(formatSlashes('some/long/string/', { to: '\\' })).toBe('some\\long\\string\\');
		expect(formatSlashes('some\\long\\string\\', { to: '\\' })).toBe('some\\long\\string\\');
	});

	it('Adds single leading slash if `start` argument is `true`', () => {
		expect(formatSlashes('some/long/string/', { start: true })).toBe('/some/long/string/');
		expect(formatSlashes('some\\long\\string\\', { to: '/', start: true })).toBe('/some/long/string/');
		expect(formatSlashes('/some/long/string/', { to: '/', start: true })).toBe('/some/long/string/');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', start: true })).toBe('/some/long/string/');

		expect(formatSlashes('some/long/string/', { to: '\\', start: true })).toBe('\\some\\long\\string\\');
		expect(formatSlashes('\\some\\long\\string\\', { to: '\\', start: true })).toBe('\\some\\long\\string\\');
	});

	it('Removes leading slashes if `start` argument is `false`', () => {
		expect(formatSlashes('some/long/string/', { start: false })).toBe('some/long/string/');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', start: false })).toBe('some/long/string/');
		expect(formatSlashes('/some/long/string/', { to: '/', start: false })).toBe('some/long/string/');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', start: false })).toBe('some/long/string/');

		expect(formatSlashes('some/long/string/', { to: '\\', start: false })).toBe('some\\long\\string\\');
		expect(formatSlashes('/some/long/string/', { to: '\\', start: false })).toBe('some\\long\\string\\');
		expect(formatSlashes('\\some\\long\\string\\', { to: '\\', start: false })).toBe('some\\long\\string\\');
	});

	it('Adds single trailing slash if `end` argument is `true`', () => {
		expect(formatSlashes('some/long/string/', { end: true })).toBe('some/long/string/');
		expect(formatSlashes('some\\long\\string', { to: '/', end: true })).toBe('some/long/string/');
		expect(formatSlashes('/some/long/string', { to: '/', end: true })).toBe('/some/long/string/');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', end: true })).toBe('/some/long/string/');

		expect(formatSlashes('some/long/string', { to: '\\', end: true })).toBe('some\\long\\string\\');
		expect(formatSlashes('\\some\\long\\string', { to: '\\', end: true })).toBe('\\some\\long\\string\\');
	});

	it('Removes trailing slashes if `end` argument is `false`', () => {
		expect(formatSlashes('some/long/string/', { end: false })).toBe('some/long/string');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', end: false })).toBe('/some/long/string');
		expect(formatSlashes('/some/long/string/', { to: '/', end: false })).toBe('/some/long/string');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', end: false })).toBe('/some/long/string');

		expect(formatSlashes('some/long/string/', { to: '\\', end: false })).toBe('some\\long\\string');
		expect(formatSlashes('/some/long/string/', { to: '\\', end: false })).toBe('\\some\\long\\string');
		expect(formatSlashes('\\some\\long\\string\\', { to: '\\', end: false })).toBe('\\some\\long\\string');
	});

	it('Adds leading/trailing slashes both with `{ start: true, end: true }`', () => {
		expect(formatSlashes('/some/long/string/', { start: true, end: true })).toBe('/some/long/string/');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', start: true, end: true })).toBe('/some/long/string/');
		expect(formatSlashes('some/long/string', { to: '/', start: true, end: true })).toBe('/some/long/string/');
		expect(formatSlashes('some\\long\\string', { to: '/', start: true, end: true })).toBe('/some/long/string/');

		expect(formatSlashes('some/long/string/', { to: '\\', start: true, end: true })).toBe('\\some\\long\\string\\');
		expect(formatSlashes('/some/long/string/', { to: '\\', start: true, end: true })).toBe('\\some\\long\\string\\');
		expect(formatSlashes('\\some\\long\\string\\', { to: '\\', start: true, end: true })).toBe('\\some\\long\\string\\');
	});

	it('Removes leading/trailing slashes both with `{ start: false, end: false }`', () => {
		expect(formatSlashes('/some/long/string/', { start: false, end: false })).toBe('some/long/string');
		expect(formatSlashes('\\some\\long\\string\\', { to: '/', start: false, end: false })).toBe('some/long/string');
		expect(formatSlashes('some/long/string', { to: '/', start: false, end: false })).toBe('some/long/string');
		expect(formatSlashes('some\\long\\string', { to: '/', start: false, end: false })).toBe('some/long/string');

		expect(formatSlashes('some/long/string/', { to: '\\', start: false, end: false })).toBe('some\\long\\string');
		expect(formatSlashes('/some/long/string/', { to: '\\', start: false, end: false })).toBe('some\\long\\string');
		expect(formatSlashes('\\some\\long\\string\\', { to: '\\', start: false, end: false })).toBe('some\\long\\string');
	});
});
