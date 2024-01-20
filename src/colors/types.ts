/* eslint-disable jsdoc/no-multi-asterisks -- Need a list inside JSDoc. */

export type AlphaChannelOption = {
	/**
	 * Whether to include information about alpha channel in a resulting HEX string.
	 * * `always` (default) will include alpha channel information regardless of whether it is represented in the input data;
	 * * `never` will always omit alpha channel information;
	 * * `if-presented` will preserve alpha channel only if input includes an information about alpha channel, and omit otherwise.
	 *
	 * @default 'always'
	 */
	alphaChannel: 'always' | 'never' | 'if-presented';
};
