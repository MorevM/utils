import { deepEqual as _deepEqual, circularDeepEqual } from 'fast-equals';

/**
 * Checks if of two objects are the same data (deep equality).
 * There is no support for circular objects.
 *
 * @param   a   The value to compare #1.
 * @param   b   The value to compare #2.
 *
 * @returns     Result of comparing two given values (deep equality).
 */
export const deepEqual = (a: unknown, b: unknown) => _deepEqual(a, b);

/**
 * Checks if of two objects are the same data (deep equality).
 * This version handles circular objects correctly.
 *
 * @param   a   The value to compare #1.
 * @param   b   The value to compare #2.
 *
 * @returns     Result of comparing two given values (deep equality).
 */
export const deepEqualCircular = (a: unknown, b: unknown) => circularDeepEqual(a, b);
