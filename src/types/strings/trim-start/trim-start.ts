/**
 * Removes repeating `Character` from the left side of given `Input`
 */
export type TrimStart<Input extends string, Character extends string = ' '> =
	Input extends `${Character}${infer R}` ? TrimStart<R, Character> : Input;
