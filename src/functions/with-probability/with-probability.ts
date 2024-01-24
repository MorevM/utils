/* eslint-disable import/exports-last */
import { toNumericProbability, toValue } from './with-probability.utils';

type ReturnValue<Value> = Value extends ((...args: any[]) => any)
	? ReturnType<Value>
	: Value;

/**
 * Function for obtaining a value with a certain probability.
 * It is used primarily in the generation of mock data.
 *
 * @example
 * const discount = withProbability(.8, 0, () => randomInteger(200, 1000))
 *
 * @param   probability      Probability that `primaryValue` will be returned.
 * @param   primaryValue     A primary value.
 * @param   secondaryValue   A secondary value.
 *
 * @returns                  The primary value with the given probability, otherwise secondary value.
 */
export const withProbability = <A, B>(
	probability: number | string,
	primaryValue: A,
	secondaryValue: B,
): ReturnValue<A> | ReturnValue<B> => {
	if (probability === 1) return toValue(primaryValue);
	if (probability === 0) return toValue(secondaryValue);

	return Math.random() > toNumericProbability(probability)
		? toValue(secondaryValue)
		: toValue(primaryValue);
};

const q = withProbability(.5, 1, () => 'qwe');
const qq = withProbability('50%', 1, () => 'qwe');
