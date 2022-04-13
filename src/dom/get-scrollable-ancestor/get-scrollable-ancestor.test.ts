/* eslint-disable sonarjs/no-duplicate-string */
import { getScrollableAncestor } from './get-scrollable-ancestor';

describe('isDescendantOf', () => {
	beforeAll(() => {
		document.body.insertAdjacentHTML('beforeend', `
			<div id="root">
				<div class="scrollable-both">
					<div class="scrollable-y">
						<div class="scrollable-x">
							<div class="x"></div>
						</div>
					</div>
				</div>
				<div class="outside"></div>
			</div>
		`);

		// Jest won't parse `overflow`, so it's defined separately
		const style = document.createElement('style');
		style.innerHTML = `
			.scrollable-x { overflow-x: auto; }
			.scrollable-y { overflow-y: scroll; }
			.scrollable-both { overflow-x: auto; overflow-y: scroll; }
		`;
		document.head.append(style);
	});

	it('Returns `window` if element doesn\'t exists', () => {
		expect(getScrollableAncestor(null)).toBe(window);
	});

	it('Returns `window` if no scrollable ancestors found', () => {
		const outside = document.querySelector('.outside');

		expect(getScrollableAncestor(outside)).toBe(window);
	});

	it('Returns closest scrollable ancestor if called with no arguments', () => {
		const x = document.querySelector('.x');
		const scrollableX = document.querySelector('.scrollable-x');

		expect(getScrollableAncestor(x)).toBe(scrollableX);
	});

	it('Returns closest scrollable ancestor consider axis given', () => {
		const x = document.querySelector('.x');
		const scrollableY = document.querySelector('.scrollable-y');

		expect(getScrollableAncestor(x, 'y')).toBe(scrollableY);
	});
});
