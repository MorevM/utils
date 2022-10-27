import { getWindowScroll } from '../get-window-scroll/get-window-scroll';

type Axis = 'x' | 'y' | 'both';
type ToReturn<T> = T extends 'both' ? { x: number; y: number } : number;

const getElementScroll = <T extends Axis>(el: Element, axis: T = 'both' as T): ToReturn<T> => {
	if (axis === 'both') {
		return { x: el.scrollLeft, y: el.scrollTop } as ToReturn<T>;
	}

	return axis === 'x' ? el.scrollLeft as ToReturn<T> : el.scrollTop as ToReturn<T>;
};

/**
 * Retrieves the element offset from given ancestor.
 *
 * @param   el       Element
 * @param   axis     Retrieve only `x` or `y` offset, or both
 * @param   parent   Parent element, default is `window`
 * @returns          The element offset
 */
export const getElementOffset = <T extends Axis>(
	el: Element,
	axis: T = 'both' as T,
	parent: Element | Window = window,
): ToReturn<T> => {
	const parentRect = parent === window
		? { top: 0, left: 0 }
		: (parent as Element).getBoundingClientRect();
	const elRect = el.getBoundingClientRect();

	const top = elRect.top - parentRect.top;
	const left = elRect.left - parentRect.left;

	const scroll = parent === window
		? getWindowScroll(axis)
		: getElementScroll(parent as Element, axis);

	if (axis === 'y') return top + (scroll as number) as ToReturn<T>;
	if (axis === 'x') return left + (scroll as number) as ToReturn<T>;

	return {
		// @ts-expect-error -- TODO
		x: left + scroll.x,
		// @ts-expect-error -- TODO
		y: top + scroll.y,
	} as ToReturn<T>;
};
