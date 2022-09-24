/**
 * Removes repeating `Character` from the right side of given `Input`.
 */
export type TrimRight<Input extends string, Character extends string = ' '> =
	Input extends `${infer R}${Character}` ? TrimRight<R, Character> : Input;
