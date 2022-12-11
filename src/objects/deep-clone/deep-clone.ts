// ALARM: Write proper tests before replacing the external lib.
import copy, { copyStrict } from 'fast-copy';

/**
 * Copies a value deeply.
 *
 * @see https://github.com/planttheidea/fast-copy#copy
 *
 * @param   value   The value being processed.
 *
 * @returns         The structured clone of a given value.
 */
export const deepClone = <T>(value: T) => copy(value);

/**
 * Copies a value deeply considering property descriptors,
 * non-enumerable keys and any non-standard extensions.
 *
 * @see https://github.com/planttheidea/fast-copy#copystrict
 *
 * @param   value   The value being processed.
 *
 * @returns         The structured clone of a given value.
 */
export const deepCloneStrict = <T>(value: T) => copyStrict(value);
