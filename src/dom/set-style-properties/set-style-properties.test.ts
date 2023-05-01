import { setStyleProperties } from './set-style-properties';

describe('set-style-properties', () => {
	let el: HTMLElement;

	beforeAll(() => {
		document.body.insertAdjacentHTML('beforeend', `<div class="element"></div>`);
		el = document.querySelector('.element') as HTMLElement;
	});

	afterAll(() => {
		document.querySelector('.element')?.remove();
	});

	it('Sets multiple style and custom properties with mixed type', () => {
		setStyleProperties(el, {
			'line-height': 1.2,
			'width': '0',
			'height': 0,
			'background-color': '',
			'border-color': undefined,
			'color': null,
			'--some-property': '100px',
		});

		expect(el.style.getPropertyValue('line-height')).toBe('1.2');
		expect(el.style.getPropertyValue('width')).toBe('0px');
		expect(el.style.getPropertyValue('height')).toBe('0px');
		expect(el.style.getPropertyValue('background-color')).toBe('');
		expect(el.style.getPropertyValue('border-color')).toBe('');
		expect(el.style.getPropertyValue('color')).toBe('');
		expect(el.style.getPropertyValue('--some-property')).toBe('100px');
		expect(el.style.getPropertyValue('--non-existed')).toBe('');
	});

	it('Sets multiple style and custom properties marked as important', () => {
		setStyleProperties(el, {
			'width': '0      !important',
			'height': '50%!important',
			'--prop': '10px!important',
			'--just-prop': '1em',
			'color': 'rgb(255, 255, 255)',
		});

		expect(el.style.getPropertyValue('width')).toBe('0px');
		expect(el.style.getPropertyPriority('width')).toBe('important');

		expect(el.style.getPropertyValue('height')).toBe('50%');
		expect(el.style.getPropertyPriority('height')).toBe('important');

		expect(el.style.getPropertyValue('--prop')).toBe('10px');
		expect(el.style.getPropertyPriority('--prop')).toBe('important');

		expect(el.style.getPropertyValue('--just-prop')).toBe('1em');
		expect(el.style.getPropertyPriority('--just-prop')).toBe('');

		expect(el.style.getPropertyValue('color')).toBe('rgb(255, 255, 255)');
		expect(el.style.getPropertyPriority('color')).toBe('');

		expect(el.style.getPropertyValue('--non-existed')).toBe('');
		expect(el.style.getPropertyPriority('--non-existed')).toBe('');
	});

	it('Returns an element itself', () => {
		const el_ = setStyleProperties(el, {
			width: '100px',
			height: '100px',
		});

		expect(el_).toStrictEqual(el);
	});
});
