/**
 * Removes repeating `Character` from the right side of given `Input`.
 */
export type TrimEnd<Input extends string, Character extends string = ' '> =
	Input extends `${infer R}${Character}` ? TrimEnd<R, Character> : Input;
