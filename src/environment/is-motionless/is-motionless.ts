/**
 * Checks whether the user has requested the operating system
 * to minimize the amount of animation or motion it uses.
 *
 * @returns   Whether user prefer to reduce motion
 */
export const isMotionless = (): boolean =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;
