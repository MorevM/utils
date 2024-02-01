/* eslint-disable jsdoc/no-multi-asterisks -- Need a list inside JSDocs */
import type { IntRange } from 'type-fest';
import type { ArrayOf } from '../../types';

export type Input = Date | string | number;

export type Options = {
	/**
	 * Whether to construct the string using value as UTC.
	 *
	 * @default false
	 */
	utc: boolean;

	/**
	 * A locale to use.
	 */
	locale: string;
};

export type LocaleObject = {
	/**
	 * Locale name.
	 */
	name: string;
	/**
	 * Locale-specific values.
	 */
	values: {
		/**
		 * First day of the week relative to Sunday, e.g.
		 * `0`, if the first day of the week is Sunday,
		 * `1` if the first day of the week is Monday, etc.
		 */
		firstDayOfWeekIndex: IntRange<0, 6>;

		/**
		 * Locale-specific day names.
		 */
		dayNames: {
			/**
			 * Abbreviated day names in order started with Sunday day, e.g. `['Sun', 'Mon', ...]`
			 */
			abbreviated: ArrayOf<'exactly', 7, string>;

			/**
			 * Wide (full) day names in order started with Sunday day, e.g. `['Sunday', 'Monday', ...]`
			 */
			wide: ArrayOf<'exactly', 7, string> | ArrayOf<'exactly', 7, [string, string]>;
		};

		/**
		 * Locale-specific month names.
		 */
		monthNames: {
			/**
			 * Abbreviated month names in order started with January day, e.g. `['Jan', 'Feb', ...]`
			 */
			abbreviated: ArrayOf<'exactly', 12, string>;

			/**
			 * Wide (full) month names in order started with January day, e.g. `['January', 'February', ...]`
			 */
			wide: ArrayOf<'exactly', 12, string> | ArrayOf<'exactly', 12, [string, string]>;
		};
	};
};
