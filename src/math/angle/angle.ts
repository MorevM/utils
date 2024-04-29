/* eslint-disable func-style -- Much better to work with overloads */
import { isArray, isNull, isNumeric, isObject } from '../../guards';
import type { PointObject, PointTuple } from '../math.types';

type ValidValue = PointObject | PointTuple | number;

/**
 * Calculates the clockwise angle between two 2D points in degrees in the range `[0..359]`.
 *
 * @param   point1   An object of form `{ x: number; y: number }` describing the first point.
 * @param   point2   An object of form `{ x: number; y: number }` describing the second point.
 *
 * @returns          A distance between two points.
 */
export function angle(point1: PointObject, point2: PointObject): number;

/**
 * Calculates the clockwise angle between two 2D points in degrees in the range `[0..359]`.
 *
 * @param   point1   A tuple of form `[x: number; y: number]` describing the first point.
 * @param   point2   A tuple of form `[x: number; y: number]` describing the second point.
 *
 * @returns          A distance between two points.
 */
export function angle(point1: PointTuple, point2: PointTuple): number;

/**
 * Calculates the clockwise angle between two 2D points in degrees in the range `[0..359]`.
 *
 * @param   x1   `x` coordinate of the first point.
 * @param   y1   `y` coordinate of the first point.
 * @param   x2   `x` coordinate of the second point.
 * @param   y2   `y` coordinate of the second point.
 *
 * @returns      A distance between two points.
 */
export function angle(x1: number, y1: number, x2: number, y2: number): number;
export function angle(arg1: ValidValue, arg2: ValidValue, arg3?: number, arg4?: number) {
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
	const [dx, dy] = [x2 - x1, y2 - y1];

	const theta =  Math.atan2(dx, dy) * 180 / Math.PI;

	return theta < 0 ? theta + 360 : theta;
}
