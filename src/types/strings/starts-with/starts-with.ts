/**
 * A string starting with another string.
 */
export type StartsWith<Affix extends string> = `${Affix}${string}`;
