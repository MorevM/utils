import { isElement } from '../../guards/is-element/is-element';
import { isString } from '../../guards/is-string/is-string';

/**
 * Retrieves the Element by a given selector using optional parent element,
 * or just returns a given element as is.
 *
 * @param   value    Queried element selector or the element itself.
 * @param   parent   The parent element within which to search.
 *
 * @returns          The element being queried or `null` if does not exists.
 */
export const getElement = <El extends Element = Element>(
	value: Element | string | null,
	parent: Window | Element | string | null = null,
): El | null => {
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
			? parent.contains(value) ? value as El : null
			: value as El;
	}

	return null;
};
