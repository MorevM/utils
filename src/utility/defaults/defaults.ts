import { isObject } from '../../types/is-object/is-object';

type IObject = Record<string, any>;

type MergeObjects<Defaults extends IObject, Input extends IObject> = Input extends Defaults
	? Input
	: (
		Omit<Defaults, keyof Defaults & keyof Input>
		& Omit<Input, keyof Defaults & keyof Input>
		& {
			-readonly [Key in keyof Defaults & keyof Input]: Input[Key]
		});

type DefaultsFn = <Defaults extends IObject, Input extends IObject>(
	defaults: Defaults, ...input: Array<Input | null | undefined>
) => MergeObjects<Defaults, Input>;

type Merger = <T extends IObject, K extends keyof T>(
	obj: T, key: keyof T, value: T[K], stack: string
) => boolean | undefined;

// Base function to apply defaults
const _defaults = <T extends IObject>(defaults: T, input?: T | null, stack: string = '', merger?: Merger): T => {
	const result = { ...defaults };
	if (!isObject(input)) return result;

	Object.entries(input).forEach(([key, val]) => {
		if (merger?.(result, key, val, stack)) return;

		if (isObject(val) && isObject(result[key])) {
			Object.assign(result, { [key]: _defaults(result[key], val, (stack ? `${stack}.` : '') + key, merger) });
		} else {
			Object.assign(result, { [key]: val });
		}
	});

	return result;
};


/**
 * Custom merger function.
 *
 * @callback MergerFn
 * @param   {object}   obj     Defaults.
 * @param   {string}   key     Key being processed.
 * @param   {any}      value   Value being processed.
 * @param   {string}   stack   Path to value.
 */

/**
 * Creates defaults function with custom merger.
 *
 * @param     {MergerFn}   merger   Custom merger function
 *
 * @returns   {Function}            Defaults function with custom merger applied.
 */
export const createDefaults = (merger?: Merger): DefaultsFn => {
	return (...args) => args.reduce<any>((p, c) => _defaults(p, c, '', merger), {});
};

/**
 * Mixes properties from source into target when
 *
 * @param     {object}   defaults   Defaults.
 * @param     {object}   input      Custom object to be merged with defaults.
 *
 * @returns   {object}              Merged object.
 */
export const defaults = createDefaults();
