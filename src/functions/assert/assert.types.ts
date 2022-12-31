/* eslint-disable @typescript-eslint/prefer-function-type */
/* eslint-disable import/exports-last */
import type { JsonObject } from 'type-fest';
import type { PartialRequired } from '../../types';

/**
 * Properties that are passed (or executed and then passed) to reporters and Error.
 */
export type Properties = JsonObject | (() => JsonObject);

/**
 * Failure type depending on the type of the first argument.
 */
export type FailureType = 'condition' | 'no-value';

/**
 * The function that formats an error.
 *
 * @param   failureType   The failure type: `condition` or `no-value`.
 * @param   message       The custom message provided by developer.
 * @param   properties    The custom properties provided by developer.
 *
 * @returns               Formatted string message.
 */
export type ErrorFormatter = (
	failureType: FailureType,
	message?: string,
	properties?: JsonObject,
) => string;

/**
 * The function that creates an Error object depending on given arguments.
 *
 * @param   failureType   The failure type: `condition` or `no-value`.
 * @param   message       The custom message provided by developer.
 * @param   properties    The custom properties provided by developer.
 *
 * @returns               Error instance to be thrown.
 */
export type ErrorCreator = (
	failureType: FailureType,
	message?: string,
	properties?: JsonObject,
) => Error;

/**
 * The function that executes user-defined logic
 * depending on the given arguments before Error is thrown.
 *
 * @param   failureType   The failure type: `condition` or `no-value`.
 * @param   message       The custom message provided by developer.
 * @param   properties    The custom properties provided by developer.
 */
export type ErrorReporter = (
	failureType: FailureType,
	error: Error,
	message?: string,
	properties?: JsonObject,
) => void;

/**
 * The function that executes user-defined logic depending on the given arguments
 * using `.soft()` version of `assert` if it fails.
 *
 * @param   failureType   The failure type: `condition` or `no-value`.
 * @param   message       The custom message provided by developer.
 * @param   properties    The custom properties provided by developer.
 */
export type WarningReporter = (
	failureType: FailureType,
	message?: string,
	properties?: JsonObject,
) => void;

/**
 * Configuration of `assert` method.
 */
export type AssertConfiguration = {
	formatter?: ErrorFormatter;
	errorCreator?: ErrorCreator;
	errorReporter?: ErrorReporter;
	warningReporter?: WarningReporter;
};

export type RequiredAssertConfiguration =
	PartialRequired<AssertConfiguration, 'formatter' | 'errorCreator'>;


// TODO: Type the return value if these issues will be resolved:
// https://github.com/microsoft/TypeScript/issues/40562
// https://github.com/microsoft/TypeScript/issues/34636
export interface HardAssert {
	/**
	 * Verifies that the condition is satisfied.
	 *
	 * @param   condition    Condition to be true.
	 * @param   message      The custom message provided by developer.
	 * @param   properties   The custom properties provided by developer.
	 *
	 * @throws Throws exception if condition is `false`.
	 */
	(condition: boolean, message?: string, properties?: Properties): asserts condition;

	/**
	 * Verifies that the given value is not `null` or `undefined`.
	 *
	 * @param   value        Value to be verified.
	 * @param   message      The custom message provided by developer.
	 * @param   properties   The custom properties provided by developer.
	 *
	 * @throws Throws exception if value is `null` or `undefined`.
	 */
	<T>(value: T | boolean | undefined | null, message?: string, properties?: Properties): asserts value is T;
}

export interface SoftAssert {
	/**
	 * Test if the condition is satisfied. \
	 * If `false`, a warning will be reported.
	 *
	 * @param   condition    Condition to be `true`.
	 * @param   message      The custom message provided by developer.
	 * @param   properties   The custom properties provided by developer.
	 *
	 * @returns              Boolean representing condition.
	 */
	(condition: boolean, message?: string, properties?: Properties): condition is true;

	/**
	 * Test if the given value is not `null` or `undefined`. \
	 * If value is `null` or `undefined`, a warning will be reported.
	 *
	 * @param   value        Value to test.
	 * @param   message      The custom message provided by developer.
	 * @param   properties   The custom properties provided by developer.
	 *
	 * @throws Throws exception if value is `null` or `undefined`.
	 */
	<T>(value: T | boolean | undefined | null, message?: string, properties?: Properties): value is T;
}

export interface Assert extends HardAssert {
	/**
	 * The version of `assert` utility that doesn't throw an Error.
	 */
	soft: SoftAssert;
}
