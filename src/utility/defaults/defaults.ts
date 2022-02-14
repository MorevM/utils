import { isObject } from '../../types/is-object/is-object';

type IObject = Record<string, unknown>;

/**
 * Mixes properties from source into target when
 *
 * @param     {object}   target   [target description]
 * @param     {object}   source   [source description]
 *
 * @returns   {object}            Merged object.
 */
export const defaults = (target: IObject, source: IObject): object => {
	const result = { ...target };
	if (!isObject(target) || !isObject(source)) return result;

	Object.keys(source).forEach(key => {
		if (isObject(source[key])) {
			if (target[key]) {
				result[key] = defaults(target[key] as IObject, source[key] as IObject);
			} else {
				Object.assign(result, { [key]: source[key] });
			}
		} else {
			Object.assign(result, { [key]: source[key] });
		}
	});

	return result;
};
