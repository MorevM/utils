import { isNullish } from '../../guards';

// TODO: Conditional tuple
export const inRange = (value: number, ...ranges: Array<[number | null, number | null]>) =>
	ranges.some(([min, max]) => {
		if (!isNullish(min) && value < min) return false;
		// eslint-disable-next-line sonarjs/prefer-single-boolean-return
		if (!isNullish(max) && value > max) return false;

		return true;
	});
