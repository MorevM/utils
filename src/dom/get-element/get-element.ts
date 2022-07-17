import { isElement } from '../../guards/is-element/is-element';
import { isString } from '../../guards/is-string/is-string';

/**
 * Retrieves the Element by a given selector using optional parent element,
 * or just returns a given element as is.
 *
 * @param   value    Queried element selector or the element itself.
 * @param   parent
 *
 * @returns            The element being queried.
 */
export const getElement = (value: Element | string | null, parent: Element | string | null = null) => {
	if (isString(parent)) {
		parent = document.querySelector(parent);
	}

	if (isString(value)) {
		return isElement(parent)
			? parent.querySelector(value)
			: document.querySelector(value);
	}

	if (isElement(value)) {
		return isElement(parent)
			? parent.contains(value) ? value : null
			: value;
	}

	return null;
};
