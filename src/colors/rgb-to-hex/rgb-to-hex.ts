import { isArray, isHex, isInteger, isNull, isNullish, isNumeric, isObject, isString } from '../../guards';
import { clamp, toNumber } from '../../numbers';
import { normalizeHex } from '../normalize-hex/normalize-hex';
import type { ObjectShortMaybeAlpha } from '../colors.types';
import type { Options, Input } from './rgb-to-hex.types';

const CSS_REG_EXP = /^rgba?\(((?:\s*\d+\s*,?\s*){2}\d+)(\s*[,/]\s*-?[\d.]+%?)?\s*\);?$/m;

const DEFAULT_OPTIONS: Options = {
	alphaChannel: 'always',
	preferableNotation: 'long',
};

const numberToHex = (part: number) => part.toString(16).padStart(2, '0');
const isValidRgbPart = (part: unknown): part is number => isInteger(part) && part >= 0 && part <= 255;
const isValidAlphaPart = (part: unknown): part is number => isNumeric(part) && part >= 0 && part <= 1;

/**
 * Turns an RGB(A) object, array or CSS string into a HEX string.
 *
 * @param   source        An object representing a splitted RGB(A) value with long or short key names,
 *                        tuple of 3 or 4 numbers representing RGB(A) value, or CSS string.
 * @param   userOptions   Transformation options.
 *
 * @returns               HEX string built from `input` or `null` in case of invalid input.
 */
export const rgbToHex = (source: Input, userOptions?: Partial<Options>): string | null => {
	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	const toHex = (r: number, g: number, b: number, a: number | null) => {
		const hex = `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}${isNull(a) ? '' : numberToHex(a)}`;

		return normalizeHex(hex, {
			alphaChannel: options.alphaChannel,
			notation: options.preferableNotation,
		});
	};

	// Assume `input` is a CSS string or a HEX string itself
	if (isString(source)) {
		source = source.toLowerCase().trim();

		if (isHex([...source].join(''))) {
			source = normalizeHex(source, {
				notation: options.preferableNotation,
				alphaChannel: options.alphaChannel,
			}) ?? '';
			return source || null;
		}

		if (!source.startsWith('rgb')) return null;

		const parts = source.replaceAll(/\s+/g, ' ').match(CSS_REG_EXP);
		if (!parts) return null;

		const [_, rgb, alphaPart] = parts;
		const rgbParts = rgb.split(/ |, /)
			.map((part) => parseInt(part, 10))
			.filter((part) => !Number.isNaN(part));

		if (rgbParts.length !== 3) return null;
		if (rgbParts.some((part) => !isValidRgbPart(part))) return null;

		const [r, g, b] = rgbParts;

		const a = (() => {
			if (!alphaPart) return null;
			const cleanAlphaPart = alphaPart.replaceAll(/[^\d%\-.]/g, '');

			// Assume a percentage value like `rgba(0 0 0 / 50%)`
			if (cleanAlphaPart.endsWith('%')) {
				const percent = toNumber(alphaPart.replaceAll(/[^\d\-.]/g, ''), null);
				if (percent === null) return null;
				return Math.round(255 * clamp(percent, 0, 100) / 100);
			}

			// Assume value as amount in range `[0..1]` like `rgba(0 0 0 / .5)`
			const amount = toNumber(cleanAlphaPart, null);
			if (amount === null) return null;

			return Math.round(255 * clamp(amount, 0, 1));
		})();

		return toHex(r, g, b, a);
	}

	// Assume input is a tuple of 3 or 4 numbers like `[0, 0, 0, [0..1]]`
	if (isArray(source)) {
		const cleanInput = source
			.map((part) => toNumber(part, null))
			.filter((part) => part !== null);

		if (cleanInput.length !== 3 && cleanInput.length !== 4) return null;
		if (cleanInput.slice(0, 3).some((part) => !isValidRgbPart(part))) return null;

		const alpha = cleanInput[3] ?? null;
		if (alpha !== null && !isValidAlphaPart(alpha)) return null;

		const a = alpha === null
			? null
			: Math.round(255 * alpha);

		return toHex(cleanInput[0], cleanInput[1], cleanInput[2], a);
	}

	if (isObject(source)) {
		let rgb: ObjectShortMaybeAlpha | null = null;

		if ('r' in source && 'g' in source && 'b' in source) {
			rgb = { r: source.r, g: source.g, b: source.b, a: source.a };
		}

		if ('red' in source && 'green' in source && 'blue' in source) {
			rgb = { r: source.red, g: source.green, b: source.blue, a: source.alpha };
		}

		if (!rgb) return null;

		if ([rgb.r, rgb.g, rgb.b].some((value) => !isValidRgbPart(value))) return null;
		if (!isNullish(rgb.a) && !isValidAlphaPart(rgb.a)) return null;

		const alpha = isNullish(rgb.a) ? null : Math.round(rgb.a * 255);
		return toHex(rgb.r, rgb.g, rgb.b, alpha);
	}

	return null;
};
