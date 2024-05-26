/* eslint-disable sonarjs/no-duplicate-string */
import { isHex, isNullish } from '../../guards';
import { LONG_HEX_REG_EXP, SHORT_HEX_REG_EXP } from '../colors.utils';
import type { Options } from './normalize-hex.types';

const DEFAULT_OPTIONS: Options = {
	notation: 'long',
	alphaChannel: 'always',
};

/**
 * Normalizes a HEX string according to options. \
 * Returns `null` if the HEX string is incorrect. \
 * Returns the HEX in a long form if it cannot be expressed in a short form regardless of `notation` option.
 *
 * @param   hex           A HEX to normalize.
 * @param   userOptions   Normalizer options.
 *
 * @returns               A normalized HEX string according to options, `null` in case of incorrect input.
 */
export const normalizeHex = (hex: string, userOptions?: Partial<Options>) => {
	hex = hex.trim().toLowerCase();
	if (!isHex(hex)) return null;

	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	const isShort = hex.length === 4 || hex.length === 5;
	const hasAlphaChannel = hex.length === 5 || hex.length === 9;
	const shouldAddAlphaChannel = options.alphaChannel === 'always'
		|| (options.alphaChannel === 'if-presented' && hasAlphaChannel);

	const parts = hex.replace(
		isShort ? SHORT_HEX_REG_EXP : LONG_HEX_REG_EXP,
	 (_, r, g, b, a) => {
			if (isShort) {
				const alpha = !isNullish(a) ? `${a}${a}` : `ff`;
				return `${r}${r}${g}${g}${b}${b}${alpha}`;
			}

			return `${r}${g}${b}${a || 'ff'}`;
	 },
	).match(/.{2}/g)!;

	const [r, g, b, a] = parts;

	const rgb = options.notation === 'short'
		? (() => {
			const toCheck = [r, g, b, shouldAddAlphaChannel ? a : null].filter(Boolean);
			return (toCheck.some((part) => !part.startsWith(part[1])))
				? `#${r}${g}${b}`
				: `#${r[0]}${g[0]}${b[0]}`;
		})()
		: `#${r}${g}${b}`;

	if (!shouldAddAlphaChannel) return rgb;

	const alpha = rgb.length === 7
		? a
		: a[0];

	return `${rgb}${alpha}`;
};
