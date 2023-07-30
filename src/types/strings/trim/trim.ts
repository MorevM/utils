import type { TrimEnd } from '../trim-end/trim-end';
import type { TrimStart } from '../trim-start/trim-start';

/**
 * Removes repeating `Character` from left and right side of given `Input`.
 */
export type Trim<Input extends string, Character extends string = ' '> =
	TrimStart<TrimEnd<Input, Character>, Character>;
