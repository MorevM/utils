/**
 * Removes any duplicated values from given array.
 *
 * @example
 * arrayUnique([1, 2, 3, 4, 1, 2, 3]) -> [1, 2, 3, 4]
 *
 * @param     {Array}   array
 *
 * @returns   {any[]}           Union of arrays
 */
export const arrayUnique = <T>(array: T[]): T[] => [...new Set(array)];
