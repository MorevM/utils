/**
 * Exposes a simple way to make the delay via Promise.
 *
 * @param     {number}          duration   Duration of delay (ms)
 *
 * @returns   {Promise<void>}              Nothing.
 */
export const sleep = async (duration: number = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));
