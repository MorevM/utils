import { isArray, isBlob, isBoolean, isDate, isFile, isFunction, isNumeric, isObject, isString } from '../../guards';
import { isNull } from '../../guards/is-null/is-null';
import { isUndefined } from '../../guards/is-undefined/is-undefined';
import { tsObject } from '../ts-object/ts-object';
import type { PlainObject } from '../../types';

type Options = {
	/**
	 * Whether to include array indices in resulting FormData keys.
	 *
	 * @default false
	 */
	indices: boolean;

	/**
	 * What to do with `null` values.
	 * * `omit` (default) will skip keys with `null` values (resulting FormData object will no contain these keys);
	 * * `preserve-as-string-null` will preserve keys with the value `null` with the string value `null`, copying the default FormData behavior;
	 * * `preserve-as-empty-string` will preserve keys with the value `null` with the empty string indicating an empty value.
	 *
	 * @default 'omit'
	 */
	nullValues: 'omit' | 'preserve-as-string-null' | 'preserve-as-empty-string';

	/**
	 * What to do with `boolean` values.
	 * * `preserve-as-strings` (default) will preserve values as `true` and `false` strings;
	 * * `preserve-as-integers` will preserve values as `0` and `1` strings.
	 *
	 * @default 'preserve-as-strings'
	 */
	booleanValues: 'preserve-as-strings' | 'preserve-as-integers';

	/**
	 * What to do with empty arrays.
	 * * `omit` (default) will skip keys with empty array values (resulting FormData object will no contain these keys);
	 * * `preserve` will preserve these keys as empty strings indicating the empty value.
	 *
	 * @default 'omit'
	 */
	emptyArrays: 'omit' | 'preserve';

	/**
	 * What to do with square brackets of arrays.
	 * * `append` (default) will add square brackets to all keys containing the array as a value;
	 * * `append-only-for-files` will add square brackets only to keys containing the files, leaving other array keys without square brackets;
	 * * `omit` will remove any square brackets in keys for arrays.
	 *
	 * @default 'append'
	 */
	arrayBrackets: 'append' | 'append-only-for-files' | 'omit';

	/**
	 * Which object key notation should be used.
	 * * `brackets` (default) will use square brackets, e.g. `foo[bar][baz]`;
	 * * `dots` will use dot as a separator, e.g. `foo.bar.baz`.
	 *
	 * @default 'brackets'
	 */
	objectKeysNotation: 'brackets' | 'dots';
};

const DEFAULT_OPTIONS: Options = {
	indices: false,
	nullValues: 'omit',
	booleanValues: 'preserve-as-strings',
	emptyArrays: 'omit',
	arrayBrackets: 'append',
	objectKeysNotation: 'brackets',
};

const serialize = (key: string, value: unknown, options: Options, formData: FormData) => {
	if (isUndefined(value)) return;

	if (isNull(value)) {
		if (options.nullValues === 'omit') return;
		const realValue = options.nullValues === 'preserve-as-empty-string' ? '' : 'null';
		formData.append(key, realValue);
		return;
	}

	if (isDate(value)) {
		formData.append(key, value.toISOString());
		return;
	}

	if (isBoolean(value)) {
		const realValue = options.booleanValues === 'preserve-as-integers'
			? (value ? '1' : '0')
			: value.toString();

		formData.append(key, realValue);
		return;
	}

	if (isArray(value)) {
		if (!value.length) {
			if (options.emptyArrays === 'preserve') {
				formData.append(key, '');
			}
			return;
		}

		const isFilesArray = value.every((innerValue) => isFile(innerValue));

		value.forEach((arrayValue, index) => {
			const arrayKey = (() => {
				if (
					(options.arrayBrackets === 'append')
					|| (options.arrayBrackets === 'append-only-for-files' && isFilesArray)
				) return `${key}[${options.indices ? index : ''}]`;

				return key.replaceAll(/\[]$/gm, '');
			})();

			serialize(arrayKey, arrayValue, options, formData);
		});
		return;
	}

	if (isBlob(value)) {
		formData.append(key, value);
		return;
	}

	if (isObject(value)) {
		tsObject.entries(value).forEach(([innerKey, innerValue]) => {
			const realInnerKey = (() => {
				if (!key) return innerKey;
				return options.objectKeysNotation === 'brackets'
					? `${key}[${innerKey}]`
					: `${key}.${innerKey}`;
			})();

			serialize(realInnerKey, innerValue, options, formData);
		});
		return;
	}

	if (isNumeric(value)) {
		formData.append(key, value.toString());
		return;
	}

	if (isString(value) || isFunction(value?.toString)) {
		formData.append(key, (value as any).toString());
	}
};

/**
 * Converts a JS object to FormData object.
 *
 * @param   object             An object to transform into FormData.
 * @param   userOptions        Transformation options.
 * @param   existingFormData   An existing FormData object to extend it instead of creating a new one.
 *
 * @returns                    FormData object constructed from the object given, considering the options.
 */
export const objectToFormdata = (
	object: PlainObject,
	userOptions?: Partial<Options> | null,
	existingFormData?: FormData,
) => {
	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	const formData = existingFormData ?? new FormData();
	serialize('', object, options, formData);

	return formData;
};
