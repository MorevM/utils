import type { PlainObject } from '../../types';

/**
 * Sets multiple style properties using the object form.
 *
 * @param   el           An element to apply styles.
 * @param   properties   An object whose keys are property names in CSS kebab-case notation,
 *                       and their values are directly CSS values.
 *
 * @returns              Given element.
 */
export const setStyleProperties = (
	el: HTMLElement,
	properties: PlainObject<string | number | undefined | null>,
) => {
	Object.entries(properties).forEach(([property, value]) => {
		value = value?.toString() ?? '';
		const important = value.includes('!important') ? 'important' : '';
		important && (value = value.replace(/\s*!important\s*/, ''));
		el.style.setProperty(property, value, important);
	});

	return el;
};
