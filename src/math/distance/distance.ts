/* eslint-disable func-style -- Much better to work with overloads */
import { isArray, isNull, isNumeric, isObject } from '../../guards';
import type { TupleOf } from '../../types';

type PointTuple = TupleOf<2, number>;
type PointObject = { x: number; y: number };
type AnyValid = PointObject | PointTuple | number;

/**
 * Calculates a distance between two 2D points.
 *
 * @param   point1   An object of form `{ x: number; y: number }` describing the first point.
 * @param   point2   An object of form `{ x: number; y: number }` describing the second point.
 *
 * @returns          A distance between two points.
 */
export function distance(point1: PointObject, point2: PointObject): number;

/**
 * Calculates a distance between two 2D points.
 *
 * @param   point1   A tuple of form `[x: number; y: number]` describing the first point.
 * @param   point2   A tuple of form `[x: number; y: number]` describing the second point.
 *
 * @returns          A distance between two points.
 */
export function distance(point1: PointTuple, point2: PointTuple): number;

/**
 * Calculates a distance between two 2D points.
 *
 * @param   x1   `x` coordinate of the first point.
 * @param   y1   `y` coordinate of the first point.
 * @param   x2   `x` coordinate of the second point.
 * @param   y2   `y` coordinate of the second point.
 *
 * @returns      A distance between two points.
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number;
export function distance(arg1: AnyValid, arg2: AnyValid, arg3?: number, arg4?: number) {
	const [p1, p2] = (() => {
		if (isObject(arg1) && isObject(arg2)) {
			return [[arg1.x, arg1.y] as const, [arg2.x, arg2.y] as const];
		}

		if (isArray(arg1) && isArray(arg2)) {
			return [arg1, arg2];
		}

		if (isNumeric(arg1) && isNumeric(arg2) && isNumeric(arg3) && isNumeric(arg4)) {
			return [[arg1, arg2], [arg3, arg4]];
		}

		return [null, null];
	})();

	if (isNull(p1) || isNull(p2)) return null;
	const [[x1, y1], [x2, y2]] = [p1, p2];

	return Math.hypot(x1 - x2, y1 - y2);
}
