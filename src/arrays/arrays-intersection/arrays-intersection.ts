/**
 * Computes intersection of passed arrays.
 *
 * @example
 * arraysIntersection([1, 2, 3], [2, 3, 4]) -> [2, 3]
 * arraysIntersection([1, 2, 3], [2, 3, 4], [3, 4, 5]) -> [3]
 *
 * @param     {...Array<any>}   arrays   Arrays to find intersection
 *
 * @returns   {Array}                    Intersection between arrays
 */
export const arraysIntersection = <T>(...arrays: T[][]): T[] =>
	arrays.reduce((acc, array) => acc.filter(i => array.includes(i)));
