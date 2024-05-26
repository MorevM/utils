import { normalizeHex } from '../normalize-hex/normalize-hex';
import type { Options, ToReturn } from './hex-to-rgb.types';

const DEFAULT_OPTIONS: Options = {
	alphaChannel: 'always',
	cssAlphaNotation: 'percentage',
	returnType: 'object-short',
};

/**
 * Converts a HEX value to an RGB(A) value in various forms.
 *
 * @param   hex           A string containing a HEX value (including `#` character).
 * @param   userOptions   Custom conversion options.
 *
 * @returns               Converted value or `null` in case of invalid input.
 */
export const hexToRgb = <UserOptions extends Partial<Options> = Options>(
	hex: string,
	userOptions?: UserOptions,
): ToReturn<UserOptions> | null => {
	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	hex = normalizeHex(hex, { alphaChannel: options.alphaChannel, notation: 'long' }) ?? '';
	if (!hex) return null;

	const shouldAddAlphaChannel = hex.length === 9;

	const parts = hex.slice(1).match(/.{2}/g)!;

	const parsed = parts.map((part, index) => {
		return index === 3
			? +(parseInt(part, 16) / 255).toFixed(2)
			: parseInt(part, 16);
	});

	const [r, g, b, a] = parsed;

	if (options.returnType === 'object-short') {
		const base = { r, g, b };
		if (options.alphaChannel === 'never') return base as ToReturn<UserOptions>;
		return shouldAddAlphaChannel
			? { ...base, a } as unknown as ToReturn<UserOptions>
			: base as ToReturn<UserOptions>;
	}

	if (options.returnType === 'object-long') {
		const base = { red: r, green: g, blue: b };
		if (options.alphaChannel === 'never') return base as ToReturn<UserOptions>;
		return shouldAddAlphaChannel
			? { ...base, alpha: a } as ToReturn<UserOptions>
			: base as ToReturn<UserOptions>;
	}

	if (options.returnType === 'array') {
		const base = [r, g, b];
		shouldAddAlphaChannel && base.push(a);

		return base as ToReturn<UserOptions>;
	}

	// options.returnType here is `css-modern` or `css-legacy`.

	const prefix = shouldAddAlphaChannel ? `rgba` : `rgb`;
	const alphaPrefix = shouldAddAlphaChannel
		? options.returnType === 'css-legacy' ? `, ` : ` / `
		: '';
	const alphaPart = shouldAddAlphaChannel
		? options.cssAlphaNotation === 'percentage' ? `${alphaPrefix}${a * 100}%` : `${alphaPrefix}${a}`
		: ``;

	return options.returnType === 'css-legacy'
		? `${prefix}(${r}, ${g}, ${b}${alphaPart})` as ToReturn<UserOptions>
		: `${prefix}(${r} ${g} ${b}${alphaPart})` as ToReturn<UserOptions>;
};
