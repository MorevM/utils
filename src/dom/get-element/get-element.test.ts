/* eslint-disable sonarjs/no-duplicate-string */
import { getElement } from './get-element';

type ElementDeclaration = { selector: string; element: Element | null };

describe('get-element', () => {
	let parentBlock: ElementDeclaration;
	let outOfParent: ElementDeclaration;
	let justBlock: ElementDeclaration;
	let childInside: ElementDeclaration;

	beforeAll(() => {
		document.body.insertAdjacentHTML('beforeend', `
			<div id="root">
				<div class="parent-block">
					<div class="just-block"></div>
					<div class="child-inside"></div>
					<div class="another-block"></div>
				</div>
				<div class="another-parent">
					<div class="another-parent-item"></div>
				</div>
				<div class="out-of-parent"></div>
			</div>
		`);

		parentBlock = {
			selector: '.parent-block',
			element: document.querySelector('.parent-block'),
		};
		outOfParent = {
			selector: '.out-of-parent',
			element: document.querySelector('.out-of-parent'),
		};
		justBlock = {
			selector: '.just-block',
			element: document.querySelector('.just-block'),
		};
		childInside = {
			selector: '.child-inside',
			element: document.querySelector('.child-inside'),
		};
	});

	afterAll(() => {
		const el = document.querySelector('#root');
		el?.remove();
	});

	it('Returns `null` if the element doesn\'t exists in DOM', () => {
		expect(getElement('.not-existed')).toBeNull();
		expect(getElement(document.querySelector('.not-existed'))).toBeNull();
	});

	it('Returns `null` if the element doesn\'t exists inside parent', () => {
		expect(getElement('.not-existed', parentBlock.selector)).toBeNull();
		expect(getElement('.not-existed', parentBlock.element)).toBeNull();
		expect(getElement(outOfParent.element, parentBlock.element)).toBeNull();
		expect(getElement(outOfParent.element, parentBlock.selector)).toBeNull();
		expect(getElement(outOfParent.selector, parentBlock.element)).toBeNull();
		expect(getElement(outOfParent.selector, parentBlock.selector)).toBeNull();
	});

	it('Returns the element obtained from a string selector', () => {
		expect(getElement(outOfParent.selector)).toBe(outOfParent.element);
		expect(getElement(justBlock.selector)).toBe(justBlock.element);
	});

	it('Returns the element obtained from a string selector using custom parent or null if doesn\'t exists', () => {
		expect(getElement(childInside.selector, parentBlock.selector)).toBe(childInside.element);
		expect(getElement(outOfParent.selector, parentBlock.selector)).toBeNull();
	});

	it('Returns the element itself', () => {
		expect(getElement(outOfParent.element)).toBe(outOfParent.element);
		expect(getElement(justBlock.element)).toBe(justBlock.element);
		expect(getElement(justBlock.element, justBlock.element)).toBe(justBlock.element);
	});

	it('Returns the element itself if `window` is passed as `parent` argument', () => {
		expect(getElement(outOfParent.element, window)).toBe(outOfParent.element);
		expect(getElement(justBlock.element, window)).toBe(justBlock.element);
	});

	it('Returns the element or null considers parent element', () => {
		expect(getElement(childInside.element, parentBlock.element)).toBe(childInside.element);
		expect(getElement(outOfParent.element, parentBlock.element)).toBeNull();
		expect(getElement(outOfParent.element, childInside.element)).toBeNull();
	});
});
