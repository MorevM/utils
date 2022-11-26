import type { PlainObject } from '../../types';

const hasOwn = (obj: PlainObject, prop: string) =>
	Object.prototype.hasOwnProperty.call(obj, prop);

const regExpKeysToCheck = ['source', 'global', 'ignoreCase', 'multiline', 'unicode', 'sticky', 'lastIndex'];

export const areObjectsEqual = (a: PlainObject, b: PlainObject, comparator: Function) => {
	const aKeys = Object.keys(a);
	let index = aKeys.length;

	if (index !== Object.keys(b).length) return false;

	while (index-- > 0) {
		const key = aKeys[index];
		if (!hasOwn(b, key) || !comparator(a[key], b[key])) return false;
	}

	return true;
};

export const areArraysEqual = (a: any[], b: any[], comparator: Function) => {
	let index = a.length;
	if (index !== b.length) return false;

	while (index-- > 0) {
		if (!comparator(a[index], b[index])) return false;
	}

	return true;
};

export const areRegExpsEqual = (a: RegExp, b: RegExp, comparator: Function) => {
	return !regExpKeysToCheck.some(key => a[key] !== b[key]);
};
