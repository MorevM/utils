/* eslint-disable @typescript-eslint/naming-convention */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

type ImportMeta = {
	url: string;
	[key: string]: any;
};

/**
 * Retrieves CommonJS variables `__dirname` and `__filename` from `import.meta`.
 *
 * @param   meta   Pass `import.meta` as argument.
 *
 * @returns          Object with `__dirname` and `__filename` strings.
 */
export const cjsVariables = (meta: ImportMeta) => {
	const __filename = fileURLToPath(meta.url);
	const __dirname = dirname(__filename);

	return { __dirname, __filename };
};
