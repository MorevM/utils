/* eslint-disable no-multi-assign */
import { getElementOffset } from './get-element-offset';

const CLASSNAME = 'test-block';
const SELECTOR = `.${CLASSNAME}`;

const mockGetBoundingClientRect = (el: Element, _options: { x: number; y: number }) => {
	const pseudoRect = {
		x: _options.x,
		y: _options.y,
		left: _options.x,
		top: _options.y,
		height: 100,
		width: 100,
		bottom: 0,
		right: 0,
		toJSON: () => {},
	};
	jest.spyOn(el, 'getBoundingClientRect')
		.mockImplementation(() => pseudoRect);
};

describe('getElementOffset', () => {
	beforeAll(() => {
		const el = document.createElement('div');
		el.classList.add(CLASSNAME);
		document.body.append(el);
	});

	afterEach(() => {
		window.scrollX = window.pageXOffset = 0;
		window.scrollY = window.pageYOffset = 0;
	});

	afterAll(() => {
		const el = document.querySelector(SELECTOR);
		el?.remove();
	});

	it('Returns the viewport-relative offset value of a given element by x-axis if `axis` argument value is `x`', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		expect(getElementOffset(el, 'x')).toBe(100);
	});

	it('Returns the viewport-relative offset value of a given element by y-axis if `axis` argument value is `y`', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		expect(getElementOffset(el, 'y')).toBe(200);
	});

	it('Returns the viewport-relative offset value of a given element by both axis if `axis` argument is omitted', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		expect(getElementOffset(el)).toStrictEqual({
			x: 100,
			y: 200,
		});
	});

	it('Considers the current scroll value', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		window.scrollX = 400;
		window.scrollY = 800;

		expect(getElementOffset(el, 'both')).toStrictEqual({
			x: 100 + 400,
			y: 200 + 800,
		});
	});

	it('Considers the custom parent element', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });
		const inner = document.createElement('div');
		mockGetBoundingClientRect(inner, { x: 150, y: 250 });
		el.append(inner);

		expect(getElementOffset(inner, 'both', el)).toStrictEqual({
			x: 150 - 100,
			y: 250 - 200,
		});
	});

	it('Uses the `window.page(X|Y)Offset` as fallbacks for `window.scroll(X|Y)` in old browsers', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		window.scrollX = window.scrollY = undefined;

		window.pageXOffset = 400;
		window.pageYOffset = 800;

		expect(getElementOffset(el, 'both')).toStrictEqual({
			x: 100 + 400,
			y: 200 + 800,
		});
	});

	it('Correctly outputs with single argument', () => {
		const el = document.querySelector(SELECTOR);
		mockGetBoundingClientRect(el, { x: 100, y: 200 });

		window.scrollX = window.scrollY = undefined;

		window.pageXOffset = 400;
		window.pageYOffset = 800;

		expect(getElementOffset(el, 'both')).toStrictEqual({
			x: 100 + 400,
			y: 200 + 800,
		});
	});
});
