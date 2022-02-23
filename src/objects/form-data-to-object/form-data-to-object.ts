/**
 * Converts given `FormData` object to plain object.
 *
 * @param     {FormData}   formData   The value being evaluated.
 *
 * @returns   {object}                Plain object builded from given FormData.
 */
export const formDataToObject = (formData: FormData): Record<string, string | File> => {
	const result = {} as Record<string, string | File>;
	for (const [key, value] of formData.entries()) {
		result[key] = value;
	}

	return result;
};
