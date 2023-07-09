/**
 * Checks the file against `accept` string as `<input type="file" />` does.
 * The OS will prevent you from selecting a file that does not satisfy the `accept` string,
 * but this doesn't happen for files you drag&drop to the field directly,
 * so files received after the `drop` event should be filtered against `accept` string manually.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 *
 * @param   file     A file to validate against given `accept` string.
 * @param   accept   The same string as the one passed to the `accept` attribute of the `<input type="file" />`
 *
 * @returns          Whether the file satisfies the given `accept' string.
 */
export const verifyFileAccept = (file: File, accept: string | undefined | null) => {
	if (!accept) return true;

	const parts = accept.split(',').map((part) => part.trim());
	const extensionParts = parts.filter((part) => part.startsWith('.'));
	const mimeParts = parts.filter((part) => !part.startsWith('.')).join(',');

	const mimeResult = mimeParts
		? new RegExp(mimeParts.replace(/\*/g, '.\*').replace(/,/g, '|')).test(file.type)
		: false;

	return mimeResult || extensionParts.some((part) => file.name.endsWith(part));
};
