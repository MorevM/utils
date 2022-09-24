import type { TrimLeft } from '../trim-left/trim-left';
import type { TrimRight } from '../trim-right/trim-right';

export type Trim<Input extends string, Character extends string = ' '> =
	TrimLeft<TrimRight<Input, Character>, Character>;
