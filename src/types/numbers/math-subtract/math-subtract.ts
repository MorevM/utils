import type { ArrayOf } from '../../arrays/array-of/array-of';

/**
 * Subtracts two numbers.
 */
export type MathSubtract<A extends number, B extends number> =
	ArrayOf<'exactly', A> extends [...(infer U), ...ArrayOf<'exactly', B>] ? U['length'] : never;
