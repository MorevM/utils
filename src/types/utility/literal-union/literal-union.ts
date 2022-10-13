import type { Primitive } from '../../aliases/primitive/primitive';

/**
 * Creates a union type by combining primitive and literal types
 * without sacrificing auto-completion in IDEs for the literal type part of the union.
 */
export type LiteralUnion<LiteralType, BaseType extends Primitive> =
	LiteralType | (BaseType & Record<never, never>);
