import { isNullish } from '../../guards';

type AllowedInTuple = number | null | undefined;
type Range = [AllowedInTuple, AllowedInTuple];

const comparator = (a: AllowedInTuple, b: AllowedInTuple) => {
	if (isNullish(a) && isNullish(b)) return 0;
	if (isNullish(a) && !isNullish(b)) return -1;
	if (!isNullish(a) && isNullish(b)) return 1;
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

export const rangesSort = (ranges: Array<Range | null>) => {
	return [...ranges].filter(r => r !== null).sort((r1, r2) => {
		if (r1[0] === r2[0]) {
			return comparator(r1[1], r2[1]);
		}

		return comparator(r1[0], r2[0]);
	});
};
