/**
 * A string ending with another string.
 */
export type EndsWith<Affix extends string = ''> = `${string}${Affix}`;
