import { isHex, isNull } from '../../guards';
import { mergeObjects } from '../../objects';
import { hexToRgb } from '../hex-to-rgb/hex-to-rgb';
import { normalizeHex } from '../normalize-hex/normalize-hex';

const DEFAULT_CANDIDATES = ['#000000', '#ffffff'];

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
const getLuminance = (hexColor: string) => {
	const rgba = hexToRgb(hexColor, { alphaChannel: 'never', returnType: 'array' });
	if (!rgba) return null;

	const k = rgba.map((value) => {
		value /= 255;
		return value < .03928
			? value / 12.92
			: (((value + .055) / 1.055) ** 2.4);
	});

	return .2126 * k[0] + .7152 * k[1] + 0.0722 * k[2];
};

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
const getContrast = (colorOne: string, colorTwo: string) => {
	const [luminance1, luminance2] = [getLuminance(colorOne), getLuminance(colorTwo)];
	if (isNull(luminance1) || isNull(luminance2)) return null;

	const ratio = (luminance1 + .05) / (luminance2 + .05);

	return luminance2 > luminance1 ? 1 / ratio : ratio;
};

type Options = {
	/**
	 * Preferable HEX notation.
	 *
	 * Examples of the short form: `#000`, `#000f`.
	 * Examples of the long form (default): `#000000`, `#000000ff`.
	 * `Preserve` will save the notation as is.
	 *
	 * Note: if the HEX cannot be expressed in a short form,
	 * the return value will be in the long form regardless of the option value.
	 */
	preferableNotation: 'preserve' | 'short' | 'long';
};

const DEFAULT_OPTIONS: Options = {
	preferableNotation: 'long',
};

/**
 * Calculates the most contrast color to the `sourceColor` color written as HEX
 * from the list of candidates represented as HEX as well (black and white by default).
 *
 * @see https://www.siegemedia.com/contrast-ratio
 *
 * @param   sourceColor      The source color to calculate the most contrast color to it.
 * @param   userCandidates   The values from which to choose the most contrasting one. \
 *                           Black and white by default.
 * @param   userOptions      Return value options.
 *
 * @returns                  The most contrast color to given `source` color from the list of `candidates`. \
 *                           `null` in case of invalid input.
 */
export const contrastColor = (
	sourceColor: string,
	userCandidates?: string[] | null,
	userOptions?: Partial<Options>,
) => {
	const options = mergeObjects(DEFAULT_OPTIONS, userOptions) as Required<Options>;
	const candidates = userCandidates ?? DEFAULT_CANDIDATES;

	if (!isHex(sourceColor)) return null;
	if (candidates.every((candidate) => !isHex(candidate))) return null;

	const contrasts = candidates.map((candidate) => getContrast(sourceColor, candidate)).filter(Boolean);
	const maxContrast = Math.max(...contrasts);

	const mostContrastColor = candidates[contrasts.indexOf(maxContrast)];

	if (options.preferableNotation === 'preserve') return mostContrastColor;

	return normalizeHex(mostContrastColor, {
		alphaChannel: 'never',
		notation: options.preferableNotation,
	});
};
