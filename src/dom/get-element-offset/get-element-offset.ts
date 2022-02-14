import { getWindowScroll } from '../get-window-scroll/get-window-scroll';

type Axis = 'x' | 'y' | 'both';
type ToReturn<T> = T extends 'both' ? { top: number; left: number } : number;

export const getElementOffset = <T extends Axis = 'y'>(
	el: HTMLElement, axis: T,
): ToReturn<T> => {
	const { top, left } = el.getBoundingClientRect();
	const scroll = getWindowScroll(axis);

	if (axis === 'y') return top + (scroll as number) as ToReturn<T>;
	if (axis === 'x') return left + (scroll as number) as ToReturn<T>;
	return {
		// @ts-expect-error -- TODO
		top: top + (scroll.top as number),
		// @ts-expect-error -- TODO
		left: left + (scroll.left as number),
	} as ToReturn<T>;
};
