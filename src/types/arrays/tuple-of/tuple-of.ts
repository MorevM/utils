import type { ArrayOf } from '../array-of/array-of';

/**
 * A tuple containing `Count` elements of the type `Type`.
 */
export type TupleOf<Count extends number, Type = any> =
	ArrayOf<'exactly', Count, Type>;
