import { isElement } from '../../types/is-element/is-element';
import { isString } from '../../types/is-string/is-string';

/**
 * Retrieves the Element by a given selector using optional parent element,
 * or just returns a given element as is.
 *
 * @param     {Element|string}   value    Queried element selector or the element itself.
 * @param     {Element|string}   parent
 *
 * @returns   {?Element}                  The element being queried.
 *
 * @protected
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
