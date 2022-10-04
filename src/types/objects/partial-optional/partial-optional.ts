import type { Except } from '../except/except';
import type { Explicit } from '../explicit/explicit';

/**
 * Creates a type that makes the given keys optional. \
 * The remaining keys are kept as is.
 */
export type PartialOptional<Base, Keys extends keyof Base> =
	Explicit<Except<Base, Keys> & Partial<Pick<Base, Keys>>>;
