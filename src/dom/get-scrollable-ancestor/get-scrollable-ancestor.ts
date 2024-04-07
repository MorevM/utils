type Axis = 'x' | 'y' | 'both';

/**
 * Retrieves the nearest scrollable ancestor element of a given element.
 *
 * @param   element   The element being evaluated.
 * @param   axis      Consider only one axis (`x`, `y`) or both
 *
 * @returns           The nearest scrollable ancestor element of a given element, or the `window` object.
 */
export const getScrollableAncestor = <El extends Element = Element>(
	element: Element | null,
	axis: Axis = 'both',
): El | Window => {
	let el = element;

	while (el?.parentElement) {
		el = el.parentElement;

		if (el === document.body) return window;
		if (el === document.documentElement) return window;

		const styles = window.getComputedStyle(el);
		const toCheck = [];
		['both', 'x'].includes(axis) && toCheck.push(styles.getPropertyValue('overflow-x'));
		['both', 'y'].includes(axis) && toCheck.push(styles.getPropertyValue('overflow-y'));

		const isScrollable = toCheck.some(val => ['auto', 'scroll'].includes(val));
		if (isScrollable) return el as El;
	}

	return window;
};
