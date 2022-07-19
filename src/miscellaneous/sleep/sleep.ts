/**
 * Exposes a simple way to make the delay via Promise.
 *
 * @param   duration   Duration of delay (ms)
 *
 * @returns              Nothing.
 */
export const sleep = async (duration: number = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));
