import type { TrimStart } from '../trim-start/trim-start';
import type { TrimEnd } from '../trim-end/trim-end';

export type Trim<Input extends string, Character extends string = ' '> =
	TrimStart<TrimEnd<Input, Character>, Character>;
