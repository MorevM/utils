/* eslint-disable import-x/exports-last */

import type { ObjectLong, ObjectLongAlpha, ObjectLongMaybeAlpha, ObjectShort, ObjectShortAlpha, ObjectShortMaybeAlpha, RgbArray, RgbArrayAlpha, RgbArrayMaybeAlpha } from '../colors.types';

/**
 * A string in form `rgb(0, 0, 0)`.
 */
type CssLegacy = string;

/**
 * A string in form `rgba(0, 0, 0, .5)`.
 */
type CssLegacyAlphaNumber = string;

/**
 * A string in form `rgba(0, 0, 0, 50%)`.
 */
type CssLegacyAlphaPercentage = string;

/**
 * A string in form `rgb(0 0 0)`.
 */
type CssModern = string;

/**
 * A string in form `rgba(0 0 0 / .5)`.
 */
type CssModernAlphaNumber = string;

/**
 * A string in form `rgba(0 0 0 / 50%)`.
 */
type CssModernAlphaPercentage = string;

/**
 * Function options.
 */
export type Options = {
	/**
	 * Whether to include the alpha channel in the output.
	 *
	 * @default 'always'
	 */
	alphaChannel: 'always' | 'never' | 'if-presented';

	/**
	 * Alpha channel notation using `returnType` with values `css-legacy` or `css-modern`.
	 *
	 * * `percentage` (default) will use alpha channel in a percentage form, e.g. `rgba(0 0 0 / 50%)`;
	 * * `number` will use alpha channel in a [0..1] number form, e.g. `rgba(0 0 0 / 0.5)`.
	 *
	 * @default 'percentage'
	 */
	cssAlphaNotation: 'percentage' | 'number';

	/**
	 * The function return type.
	 *
	 * * `object-short` (default) will return an object in form `{ r: 255, g: 255, b: 255, a: 1 }`;
	 * * `object-long` will return an object in form `{ red: 255, green: 255, blue: 255, alpha: 1 }`;
	 * * `css-legacy` will return a string in form `rgba(255, 255, 255, 0.1)`;
	 * * `css-modern` will return a string in form `rgba(255 255 255 / 100%)`;
	 * * `array` will return an array `[255, 255, 255, 1]`;
	 *
	 * @default 'object-short'
	 */
	returnType: 'object-short' | 'object-long' | 'css-legacy' | 'css-modern' | 'array';
};

type AlphaShorthand<
	AlphaChannel extends Options['alphaChannel'] | undefined,
	NeverValue,
	AlwaysValue,
	IfPresentedValue,
> =
	AlphaChannel extends 'never'
		? NeverValue
		: AlphaChannel extends 'if-presented'
			? IfPresentedValue
			: AlphaChannel extends 'always'
				? AlwaysValue
				: AlwaysValue;

type AlphaNotationType<
	Notation extends Options['cssAlphaNotation'] | undefined,
	PercentageValue,
	NumberValue,
> = Notation extends 'number' ? NumberValue : PercentageValue;

export type ToReturn<UserOptions extends Partial<Options>> =
	UserOptions['returnType'] extends 'css-legacy'
		? UserOptions['alphaChannel'] extends 'never'
			? CssLegacy
			: AlphaNotationType<UserOptions['cssAlphaNotation'], CssLegacyAlphaPercentage, CssLegacyAlphaNumber>
		: UserOptions['returnType'] extends 'css-modern'
			? UserOptions['alphaChannel'] extends 'never'
				? CssModern
				: AlphaNotationType<UserOptions['cssAlphaNotation'], CssModernAlphaPercentage, CssModernAlphaNumber>
			: UserOptions['returnType'] extends 'object-long'
				? AlphaShorthand<UserOptions['alphaChannel'], ObjectLong, ObjectLongAlpha, ObjectLongMaybeAlpha>
				: UserOptions['returnType'] extends 'array'
					? AlphaShorthand<UserOptions['alphaChannel'], RgbArray, RgbArrayAlpha, RgbArrayMaybeAlpha>
					: AlphaShorthand<UserOptions['alphaChannel'], ObjectShort, ObjectShortAlpha, ObjectShortMaybeAlpha>;
