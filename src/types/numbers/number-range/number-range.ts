import type { MathAdd } from '../math-add/math-add';
import type { MathSubtract } from '../math-subtract/math-subtract';

// Some helpful resources for understanding
// https://github.com/hyoo-ru/mam_mol/blob/master/type/int/int.ts
// https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
// https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type/69090186#69090186

/**
 * Helper utility to construct exported `NumberRange` type.
 */
type CreateNumberRange<
	Start extends number,
	End extends number,
	Result extends unknown[] = [],
	Length extends number = MathSubtract<End, Start>,
> =
	(Result['length'] extends Length
		? [...Result, End][number]
		: CreateNumberRange<Start, End, [...Result, MathAdd<Start, Result['length']>]>
	);

/**
 * Creates a range of numbers.
 * Limitations: works only with natural numbers (integer >= 0), length of resulting type is also limited to like 600 elements.
 *
 * @deprecated This function will be removed in the next major release. Use `IntRange` instead.
 */
export type NumberRange<Start extends number, End extends number> = CreateNumberRange<Start, End>;
