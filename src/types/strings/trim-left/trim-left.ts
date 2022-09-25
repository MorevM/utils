/**
 * Removes repeating `Character` from the left side of given `Input`
 */
export type TrimLeft<Input extends string, Character extends string = ' '> =
	Input extends `${Character}${infer R}` ? TrimLeft<R, Character> : Input;
