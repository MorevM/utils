import { toArray } from '../../arrays';
import { isFormData } from '../../guards';
import type { PlainObject } from '../../types';

type Input = FormData | PlainObject;
type Entry = FormDataEntryValue | FormDataEntryValue[];
type ToReturn<T extends Input> = T extends FormData
	? Record<string, Entry>
	: T;

/**
 * Converts given `FormData` object (or a plain object) to plain object.
 *
 * @param   formData   The value being evaluated.
 *
 * @returns            Plain object builded from given FormData, or original object if not FormData is passed.
 */
export const formDataToObject = <T extends Input>(formData: T): ToReturn<T> => {
	if (!isFormData(formData)) return formData as ToReturn<T>;

	const result = {} as Record<string, Entry>;
	for (const [key, value] of formData.entries()) {
		result[key] = key in result ? [...toArray(result[key]), value] : value;
	}

	return result as ToReturn<T>;
};
