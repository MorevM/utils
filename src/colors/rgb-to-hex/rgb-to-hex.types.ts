/* eslint-disable jsdoc/no-multi-asterisks -- Need a list inside JSDoc. */

import type { AlphaChannelOption, ObjectLongMaybeAlpha, ObjectShortMaybeAlpha, RgbArrayMaybeAlpha } from '../colors.types';

export type Input = string | RgbArrayMaybeAlpha | ObjectLongMaybeAlpha | ObjectShortMaybeAlpha;

export type Options = AlphaChannelOption & {
	/**
	 * Preferable HEX notation.
	 *
	 * Examples of the short form: `#000`, `#000f`.
	 * Examples of the long form (default): `#000000`, `#000000ff`.
	 *
	 * Note: if the HEX cannot be expressed in a short form,
	 * the return value will be in the long form regardless of the option value.
	 */
	preferableNotation: 'short' | 'long';
};
