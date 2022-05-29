import { toArray } from '../../arrays';

// eslint-disable-next-line no-undef
type Entry = FormDataEntryValue | FormDataEntryValue[];

/**
 * Converts given `FormData` object to plain object.
 *
 * @param     {FormData}   formData   The value being evaluated.
 *
 * @returns   {object}                Plain object builded from given FormData.
 */
export const formDataToObject = (formData: FormData): Record<string, Entry> => {
	const result = {} as Record<string, Entry>;
	for (const [key, value] of formData.entries()) {
		result[key] = key in result ? [...toArray(result[key]), value] : value;
	}

	return result;
};
