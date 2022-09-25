import type { ArrayOf } from '../../arrays/array-of/array-of';

/**
 * Sums two numbers.
 */
export type MathAdd<A extends number, B extends number> =
	[...ArrayOf<'exactly', A>, ...ArrayOf<'exactly', B>]['length'];
