import type { Explicit } from '../explicit/explicit';

/**
 * Creates a type that makes the given keys required. \
 * The remaining keys are kept as is.
 */
export type PartialRequired<Base, Keys extends keyof Base> =
	Explicit<Omit<Base, Keys> & Required<Pick<Base, Keys>>>;
