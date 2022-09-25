export const formatInfinity = (value: any, isNeeded: boolean) => isNeeded
	? ((value === Infinity || value === -Infinity) ? null : value)
	: value;
