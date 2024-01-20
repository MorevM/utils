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

/**
 * An object representing a splitted RGB value with long key names. \
 * Keys `red`, `green` and `blue` are represented as numbers in range `[0..255]`.
 */
export type ObjectLong = {
	/**
	 * Value of blue channel in range `[0..255]`.
	 */
	red: number;
	/**
	 * Value of green channel in range `[0..255]`.
	 */
	green: number;
	/**
	 * Value of blue channel in range `[0..255]`.
	 */
	blue: number;
};

/**
 * An object representing a splitted RGBA value with long key names. \
 * Keys `red`, `green` and `blue` are represented as numbers in range `[0..255]`.
 * Key `alpha` is a number in range `[0..1]`.
 */
export type ObjectLongAlpha = ObjectLong & {
	/**
	 * Value of opacity channel in range `[0..1]`.
	 */
	alpha: number;
};

/**
 * An object representing a splitted RGB(A) value with long key names. \
 * Keys `red`, `green` and `blue` are represented as numbers in range `[0..255]`.
 * Key `alpha` is a number in range `[0..1]` if the original HEX includes an information about alpha channel.
 */
export type ObjectLongMaybeAlpha = ObjectLong & {
	/**
	 * Value of opacity channel in range `[0..1]`,
	 * if the original HEX value provides an information about alpha channel.
	 */
	alpha?: number;
};

/**
 * An object representing a splitted RGB value with short key names. \
 * Keys `r`, `g` and `b` are represented as numbers in range `[0..255]`.
 */
export type ObjectShort = {
	/**
	 * Value of red channel in range `[0..255]`.
	 */
	r: number;
	/**
	 * Value of green channel in range `[0..255]`.
	 */
	g: number;
	/**
	 * Value of blue channel in range `[0..255]`.
	 */
	b: number;
};

/**
 * An object representing a splitted RGBA value with short key names. \
 * Keys `r`, `g` and `b` are represented as numbers in range `[0..255]`.
 * Key `a` is a number in range `[0..1]`.
 */
export type ObjectShortAlpha = ObjectShort & {
	/**
	 * Value of alpha channel in range `[0..1]`.
	 */
	a: number;
};

/**
 * An object representing a splitted RGB(A) value with short key names. \
 * Keys `r`, `g` and `b` are represented as numbers in range `[0..255]`.
 * Key `a` is a number in range `[0..1] if the original HEX includes an information about alpha channel.
 */
export type ObjectShortMaybeAlpha = ObjectShort & {
	/**
	 * Value of alpha channel in range `[0..1]` if the original HEX provides information about alpha channel.
	 */
	a?: number;
};

/**
 * A tuple of form `[red, green, blue]`. \
 * Each value is represented as number in range `[0..255]`.
 */
export type RgbArray = [number, number, number];

/**
 * A tuple of form `[red, green, blue, alpha]`. \
 * First three values are represented as numbers in range `[0..255]`.
 * Fourth element represented as number in range `[0..1]`.
 */
export type RgbArrayAlpha = [number, number, number, number];

/**
 * A tuple of form `[red, green, blue, alpha]`. \
 * First three values are represented as numbers in range `[0..255]`.
 * Fourth element represented as number in range `[0..1]` if the original HEX provides information about alpha channel.
 */
export type RgbArrayMaybeAlpha = [number, number, number] | [number, number, number, number];
