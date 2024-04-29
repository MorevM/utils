/* eslint-disable jsdoc/no-multi-asterisks -- Need a list inside JSDoc. */
import type { AlphaChannelOption } from '../colors.types';

export type Options = AlphaChannelOption & {
	/**
	 * What notation the HEX value should be cast to.
	 *
	 * * `long` (default) will always transform the HEX to a long notation;
	 * * `short` will always transform the HEX to a long notation;
	 * * `preserve` will save the notation as it is in the source HEX.
	 */
	notation: 'long' | 'short' | 'preserve' ;
};
