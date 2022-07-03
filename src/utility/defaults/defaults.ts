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
 * Creates defaults function with custom merger.
 *
 * @param   merger   Custom merger function
 *
 * @returns            Defaults function with custom merger applied.
 */
export const createDefaults = (merger?: Merger): DefaultsFn => {
	return (...args) => args.reduce<any>((p, c) => _defaults(p, c, '', merger), {});
};

/**
 * Mixes properties from source into target when
 *
 * @param   defaults   Defaults.
 * @param   input      Custom object to be merged with defaults.
 *
 * @returns              Merged object.
 */
export const defaults = createDefaults();
