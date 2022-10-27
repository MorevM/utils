/**
 * Shuffles the given array.
 *
 * @param   array
 *
 * @returns         Shuffled array.
 */
export const arrayShuffle = <T>(array: readonly T[]): T[] => {
	const copy = [...array];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
};
