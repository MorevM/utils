import { isString } from '../../guards';

type Reviver = Parameters<typeof JSON.parse>[1];

/**
 * `JSON.parse()` which does not throw, returning `null` instead if an error occurs.
 * This reduces verbosity due to the missing `try..catch` block,
 * also allowing a default value to be set in case of an invalid JSON string.
 *
 * NOTE: Although `JSON.parse()` allows some literals (such as numbers or boolean values) to act as arguments,
 * this feels wrong - we usually want an object or array as a result of parsing.
 * This function immediately returns `null` in case of non-string input.
 *
 * @example
 * type ResultType = {
 *   isAuthorized: true;
 *   username: string;
 * } | {
 *   isAuthorized: false;
 *   username: null;
 * };
 *
 * const defaultValue: ResultType = { isAuthorized: false, username: null }
 *
 * // `result` is typed as `ResultType` with the default value in case of an error just in one line.
 * const result = <ResultType>safeJsonParse(jsonString) ?? defaultValue;
 *
 * @param   jsonString   A string representing JSON value.
 * @param   reviver      A function that transforms the results. \
 *                       This function is called for each member of the object. \
 *                       If a member contains nested objects, the nested objects are transformed before the parent object is.
 *
 * @returns
 */
export const safeJsonParse = <ReturnType = any>(
	jsonString: unknown,
	reviver?: Reviver,
): ReturnType | null => {
	if (!isString(jsonString)) return null;

	try {
		return JSON.parse(jsonString, reviver) as ReturnType;
	} catch {
		return null;
	}
};
