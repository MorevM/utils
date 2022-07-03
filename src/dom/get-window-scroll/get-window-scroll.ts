type Axis = 'x' | 'y' | 'both';

type ToReturn<T extends Axis> = T extends 'both'
	? { top: number; left: number }
	: number;

const getScrollTop = (): number =>
	Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
const getScrollLeft = (): number =>
	Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);

/**
 * Retrieves the window scroll value for given axis, or both
 *
 * @param   axis   Axis to restrict return value
 *
 * @returns          Window scroll for given axis (or both)
 */
export const getWindowScroll = <T extends Axis = 'y'>(axis: T): ToReturn<T> => {
	if (axis === 'y') return getScrollTop() as ToReturn<T>;
	if (axis === 'x') return getScrollLeft() as ToReturn<T>;
	return { top: getScrollTop(), left: getScrollLeft() } as any;
};
