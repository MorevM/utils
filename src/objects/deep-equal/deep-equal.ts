/* eslint-disable no-self-compare */
import { isArray, isDate, isObject, isRegExp } from '../../guards/index';
import { areArraysEqual, areObjectsEqual, areRegExpsEqual } from './_utils';

// TODO: [2022-12-15] Sets and maps

/**
 * Checks if of two objects are the same data (deep equality).
 *
 * @param   a   Value to compare #1
 * @param   b   Value to compare #2
 * @returns     Result of comparing two given values (deep equality)
 */
export const deepEqual = (a: any, b: any): boolean => {
	if (a === b) return true;
	if (isObject(a) && isObject(b)) return areObjectsEqual(a, b, deepEqual);
	if (isArray(a) && isArray(b)) return areArraysEqual(a, b, deepEqual);
	if (isRegExp(a) && isRegExp(b)) return areRegExpsEqual(a, b, deepEqual);
	if (isDate(a) && isDate(b)) {
		const [d1, d2] = [a, b].map(i => i.getTime());
		return d1 === d2 || (d1 !== d1 && d2 !== d2);
	}

	return a !== a && b !== b;
};
