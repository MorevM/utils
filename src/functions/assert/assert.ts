// Heavily based on https://github.com/fram-x/assert-ts

import { isBoolean, isFunction, isNullish } from '../../guards';
import { createConfiguration, errorCreatorFactory, messageFormatter  } from './assert.utils';
import type { JsonObject } from 'type-fest';
import type { Assert, AssertConfiguration, FailureType, HardAssert, SoftAssert } from './assert.types';

let configuration = createConfiguration();

const _createAssert = (soft: boolean) => <T>(
	conditionOrValue: T | boolean | undefined | null,
	message?: string,
	properties?: JsonObject | (() => JsonObject),
) => {
	const createError = (type: FailureType, props: JsonObject) =>
		configuration.errorCreator(type, message, props);

	const report = (type: FailureType, props: JsonObject, error?: Error) => {
		error && configuration.errorReporter?.(type, error, message, props);
		!error && configuration.warningReporter?.(type, message, props);
	};

	const props = isFunction(properties) ? properties() : properties ?? {};

	if (isBoolean(conditionOrValue) && !conditionOrValue) {
		if (!soft) {
			const error = createError('condition', props);
			report('condition', props, error);
			throw error;
		}

		report('condition', props);
		return false;
	}

	if (isNullish(conditionOrValue)) {
		if (!soft) {
			const error = createError('no-value', props);
			report('no-value', props, error);
			throw error;
		}

		report('no-value', props);
		return false;
	}

	return conditionOrValue;
};

const hardAssert: HardAssert = _createAssert(false);
/* @ts-expect-error -- It works as expected but reports an error :\ */
const softAssert: SoftAssert = _createAssert(true);

const _assert = hardAssert as Assert;
_assert.soft = softAssert;

// Explicit type annotation is required:
// https://github.com/microsoft/TypeScript/issues/36931
export const assert: Assert = _assert;

/**
 * The function that allows to redeclare one or many configuration options.
 *
 * @param   customConfiguration   The custom configuration to use.
 */
export const configureAssert = (customConfiguration: AssertConfiguration) => {
	configuration = {
		...configuration,
		...customConfiguration,
		errorCreator: customConfiguration.errorCreator
			?? errorCreatorFactory(customConfiguration.formatter ?? messageFormatter),
	};
};
