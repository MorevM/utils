/* eslint-disable function-call-argument-newline */
type Axis = 'x' | 'y' | 'both';
type ToReturn<T> = T extends 'both' ? { x: number; y: number } : number;

/**
 * Retrieves the document scroll size (width, height or both).
 *
 * @param   [axis]   Whether to return the document scroll width (x) or height (y), or both.
 *
 * @returns            The document scroll size in defined axis or both.
 */
export const getDocumentSize = <T extends Axis>(axis: T = 'y' as T): ToReturn<T> => {
	const scrollWidth = Math.max(
		document.body.scrollWidth, document.documentElement.scrollWidth,
		document.body.offsetWidth, document.documentElement.offsetWidth,
		document.body.clientWidth, document.documentElement.clientWidth,
	);

	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight,
	);

	return (axis === 'both')
		? { x: scrollWidth, y: scrollHeight } as ToReturn<T>
		: (axis === 'x' ? scrollWidth as ToReturn<T> : scrollHeight as ToReturn<T>);
};
