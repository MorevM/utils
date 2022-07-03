/**
 * Removes any duplicated values from given array.
 *
 * @example
 * arrayUnique([1, 2, 3, 4, 1, 2, 3]) -> [1, 2, 3, 4]
 *
 * @param   array
 *
 * @returns           Array without any duplicated values
 */
export const arrayUnique = <T>(array: T[]): T[] => [...new Set(array)];
