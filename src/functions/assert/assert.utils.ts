import { isEmpty } from '../../guards';
import type { JsonObject } from '../../types';
import type { ErrorCreator, ErrorFormatter, FailureType, RequiredAssertConfiguration } from './assert.types';

const typeMap: { [key in FailureType]: string } = {
	'condition': 'Assert condition failed',
	'no-value': 'Assert value not undefined/null failed',
};

export const messageFormatter: ErrorFormatter = (
	failureType: FailureType,
	message?: string,
	properties?: JsonObject,
): string => {
	return [
		typeMap[failureType],
		message ? `: ${message}` : null,
		!isEmpty(properties) ? `: ${JSON.stringify(properties)}` : null,
	].filter(Boolean).join('');
};

export const errorCreatorFactory = (formatter: ErrorFormatter): ErrorCreator =>
	(failureType: FailureType, message?: string, properties?: JsonObject) =>
		new Error(formatter(failureType, message, properties));

export const createConfiguration: () => RequiredAssertConfiguration = () => ({
	formatter: messageFormatter,
	errorCreator: errorCreatorFactory(messageFormatter),
});
