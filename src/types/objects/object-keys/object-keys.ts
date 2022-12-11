/**
 * Object keys as an array. \
 * Suitable for typing `Object.keys()`
 */
export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;
