/**
 * Formats a given number with grouped thousands.
 *
 * @param   number               The number being formatted.
 * @param   decimals             The number of decimal points. Default 0.
 * @param   fractionSeparator    The separator for the decimal point. Default `.`.
 * @param   thousandsSeparator   The thousands separator. Default ` `.
 *
 * @returns                      Formatted number.
 */
export const numberFormat = (
	number: number,
	decimals: number = 0,
	fractionSeparator: string = '.',
	thousandsSeparator: string = ' ',
): string => {
	const toFixedFix = () => {
		const k = 10 ** decimals;
		return Math.round(number * k) / k;
	};

	const parts = String(decimals ? toFixedFix() : Math.round(number)).split('.');
	let [int, fraction = ''] = parts;

	if (int.length > 3) {
		int = int.replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSeparator); // eslint-disable-line unicorn/no-unsafe-regex
	}

	if (fraction.length < decimals) {
		fraction += new Array(decimals - fraction.length + 1).join('0');
	}

	return [int, fraction].filter(Boolean).join(fractionSeparator);
};
