import type { Explicit } from '../explicit/explicit';

/**
 * Creates a type that makes the given keys optional. \
 * The remaining keys are kept as is.
 */
export type PartialOptional<Base, Keys extends keyof Base> =
	Explicit<Omit<Base, Keys> & Partial<Pick<Base, Keys>>>;
