// ALARM: Write proper tests before replacing the external lib.
import { hash as _hash } from 'ohash';

type HashOptions = Parameters<typeof _hash>[1];

/**
 * Hashes any JS value into a string.
 *
 * @param   value     The value to hash.
 * @param   options   Hashing options.
 * @returns           Hash string for a given value.
 */
export const hash = (value: any, options?: HashOptions) => _hash(value, options);
