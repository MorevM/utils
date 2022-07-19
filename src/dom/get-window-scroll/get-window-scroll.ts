type Axis = 'x' | 'y' | 'both';

type ToReturn<T extends Axis> = T extends 'both'
	? { x: number; y: number }
	: number;

const getScrollTop = (): number =>
	Math.max(window.pageYOffset || 0, window.scrollY || 0, document.documentElement.scrollTop, document.body.scrollTop);
const getScrollLeft = (): number =>
	Math.max(window.pageXOffset || 0, window.scrollX || 0, document.documentElement.scrollLeft, document.body.scrollLeft);

/**
 * Retrieves the window scroll value for given axis, or both
 *
 * @param   axis   Axis to restrict return value
 *
 * @returns          Window scroll for given axis or both (default is 'y')
 */
export const getWindowScroll = <T extends Axis>(axis: T = 'y' as T): ToReturn<T> => {
	if (axis === 'y') return getScrollTop() as ToReturn<T>;
	if (axis === 'x') return getScrollLeft() as ToReturn<T>;
	return { x: getScrollLeft(), y: getScrollTop() } as ToReturn<T>;
};
