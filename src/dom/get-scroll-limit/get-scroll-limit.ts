import { getDocumentSize } from '../get-document-size/get-document-size';

type Axis = 'x' | 'y' | 'both';
type ToReturn<T> = T extends 'both' ? { x: number; y: number } : number;

const toMax = (v: number) => Math.max(0, v);

/**
 * Retrieves the maximum scroll value.
 *
 * @param   [axis]   Scroll axis (x | y | both).
 *
 * @returns            The maximum scroll value by a given axis or both (default is 'y').
 */
export const getScrollLimit = <T extends Axis>(axis: T = 'y' as T): ToReturn<T> => {
	if (axis === 'both') {
		const ds = getDocumentSize(axis as 'both');

		return {
			x: toMax(ds.x - window.innerWidth),
			y: toMax(ds.y - window.innerHeight),
		} as ToReturn<T>;
	}

	const ds = getDocumentSize(axis) as number;

	return axis === 'x'
		? toMax(ds - window.innerWidth) as ToReturn<T>
		: toMax(ds - window.innerHeight) as ToReturn<T>;
};
