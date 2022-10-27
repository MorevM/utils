import { isObject } from '../../guards/is-object/is-object';

type IObject = Record<string, any>;

type MergeObjects<Source extends IObject, Input extends IObject> = Input extends Source
	? Input
	: (
		Omit<Source, keyof Source & keyof Input>
		& Omit<Input, keyof Source & keyof Input>
		& {
			-readonly [Key in keyof Source & keyof Input]: Input[Key]
		});

type MergerFn = <Source extends IObject, Input extends IObject>(
	defaults: Source, ...input: Array<Input | null | undefined>
) => MergeObjects<Source, Input>;

type Merger = <T extends IObject, K extends keyof T>(
	obj: T, key: keyof T, value: T[K], stack: string
) => boolean | undefined;

// Base function to merge objects
const _mergeObjects = <T extends IObject>(defaults: T, input?: T | null, stack: string = '', merger?: Merger): T => {
	const result = { ...defaults };
	if (!isObject(input)) return result;

	Object.entries(input).forEach(([key, val]) => {
		if (merger?.(result, key, val, stack)) return;

		if (isObject(val) && isObject(result[key])) {
			Object.assign(result, { [key]: _mergeObjects(result[key], val, (stack ? `${stack}.` : '') + key, merger) });
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
 * @returns          Defaults function with custom merger applied.
 */
export const createMergeObjects = (merger?: Merger): MergerFn =>
	(...args) => args.reduce<any>((p, c) => _mergeObjects(p, c, '', merger), {});


/**
 * Mixes properties from source into target when
 *
 * @param   defaults   Source object
 * @param   ...input   Custom object(s) to be merged with source or result of previous merge
 *
 * @returns            Merged object.
 */
export const mergeObjects = createMergeObjects();
