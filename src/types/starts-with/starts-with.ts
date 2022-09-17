/**
 * A string starting with another string.
 */
export type StartsWith<Prefix extends string> = `${Prefix}${string}`;
