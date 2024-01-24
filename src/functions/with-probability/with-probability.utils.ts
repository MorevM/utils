import { isFunction, isString } from '../../guards';
import { clamp } from '../../numbers';

export const toNumericProbability = (value: string | number) => {
	let isPercentage = false;
	if (isString(value)) {
		isPercentage = value.trim().endsWith('%');
		value = +value.replaceAll(/[^\d\-.]/g, '');
	}

	if (Number.isNaN(value)) return 0;

	if (value > 1) isPercentage = true;

	if (isPercentage) {
		value = clamp(value, 0, 100);
		return value / 100;
	}

	return clamp(value, 0, 1);
};

export const toValue = (value: any) => (isFunction(value) ? value() : value);
