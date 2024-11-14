import { toArray } from '../../arrays';
import { mergeObjects } from '../../objects';
import type { Arrayable } from '../../types';
import { toDate } from '../to-date/to-date';
import { prefixedDateMethodsFactory } from '../dates.utils';
import type { FormatDate, Input, LocaleObject, Options } from './format-date.types';
import { FORMAT_DATE_LOCALE_EN, FORMAT_DATE_LOCALE_RU } from './format-date.locales';
import { ORDERED_DAY_INDICES, TOKEN, pad } from './format-date.utils';

const _formatDate = (pattern: string, locales: LocaleObject[], input: Input, options: Options) => {
	const { utc, locale } = options;

	const date = toDate(input);
	if (!date) return null;

	const $i18n = locales.find(({ name }) => name === locale)?.values;
	if (!$i18n) {
		throw new Error(`The locale object for locale \`${locale}\` does not exists.`);
	}

	const localized = (
		entity: 'month' | 'day',
		type: 'abbreviated' | 'wide',
		variant: 'standalone' | 'format',
		index: number,
	) => {
		const _type = toArray($i18n[`${entity}Names`][type][index]);

		return variant === 'standalone'
			? _type[0]
			: _type[1] ?? _type[0];
	};

	const get = prefixedDateMethodsFactory('get', utc);

	const day = () => date[get('Date')]();
	const weekday = () => date[get('Day')]();
	const month = () => date[get('Month')]();
	const year = () => date[get('FullYear')]();
	const hours = () => date[get('Hours')]();
	const minutes = () => date[get('Minutes')]();
	const seconds = () => date[get('Seconds')]();

	const weekdayIndex = () => {
		const offset = weekday() - $i18n.firstDayOfWeekIndex;
		return ORDERED_DAY_INDICES.at(offset)! + 1;
	};

	const timezone = (format: 'minimal' | 'basic' | 'extended') => {
		const offset = utc ? 0 : date.getTimezoneOffset();
		if (offset === 0) return 'Z';

		const sign = offset < 0 ? '+' : '-';
		const offsetHours = Math.floor(Math.abs(offset) / 60);
		const offsetMinutes = Math.abs(offset) - offsetHours * 60;

		const joinCharacter = ['basic', 'minimal'].includes(format) ? '' : ':';
		const filterer = format === 'minimal'
			? (value: number) => value !== 0
			: (value: number) => true;

		const time = [offsetHours, offsetMinutes]
			.filter((value) => filterer(value))
			.map((part) => pad(part))
			.join(joinCharacter);

		return `${sign}${time}`;
	};

	const matchers = {
		// Year
		yy: () => year().toString().slice(-2),
		yyyy: () => pad(year(), 4),
		// Month (standalone)
		L: () => month() + 1,
		LL: () => pad(month() + 1),
		LLL: () => localized('month', 'abbreviated', 'standalone', month()),
		_LLL: () => localized('month', 'abbreviated', 'standalone', month()).toLocaleLowerCase(),
		LLLL: () => localized('month', 'wide', 'standalone', month()),
		_LLLL: () => localized('month', 'wide', 'standalone', month()).toLocaleLowerCase(),
		// Month (format)
		M: () => month() + 1,
		MM: () => pad(month() + 1),
		MMM: () => localized('month', 'abbreviated', 'format', month()),
		_MMM: () => localized('month', 'abbreviated', 'format', month()).toLocaleLowerCase(),
		MMMM: () => localized('month', 'wide', 'format', month()),
		_MMMM: () => localized('month', 'wide', 'format', month()).toLocaleLowerCase(),
		// Weekday (standalone)
		c: () => weekdayIndex(),
		cc: () => pad(weekdayIndex()),
		ccc: () => localized('day', 'abbreviated', 'standalone', weekday()),
		_ccc: () => localized('day', 'abbreviated', 'standalone', weekday()).toLocaleLowerCase(),
		cccc: () => localized('day', 'wide', 'standalone', weekday()),
		_cccc: () => localized('day', 'wide', 'standalone', weekday()).toLocaleLowerCase(),
		// Weekday (format)
		e: () => weekdayIndex(),
		ee: () => pad(weekdayIndex()),
		eee: () => localized('day', 'abbreviated', 'format', weekday()),
		_eee: () => localized('day', 'abbreviated', 'format', weekday()).toLocaleLowerCase(),
		eeee: () => localized('day', 'wide', 'format', weekday()),
		_eeee: () => localized('day', 'wide', 'format', weekday()).toLocaleLowerCase(),
		// Day
		d: () => day(),
		dd: () => pad(day()),
		// Hours
		h: () => (hours() % 12) || 12,
		hh: () => pad((hours() % 12) || 12),
		H: () => hours(),
		HH: () => pad(hours()),
		// Minutes
		m: () => minutes(),
		mm: () => pad(minutes()),
		// Seconds
		s: () => seconds(),
		ss: () => pad(seconds()),
		// Timezone as JS-compatible string
		X: () => timezone('minimal'),
		XX: () => timezone('basic'),
		XXX: () => timezone('extended'),
	};

	return pattern.replaceAll(TOKEN, (match) => {
		if (match in matchers) {
			/* @ts-expect-error -- No way to type */
			return matchers[match]();
		}

		return match.slice(1, -1);
	});
};

/**
 * Creates a date format function.
 *
 * @param   localeData       Locale data.
 * @param   defaultOptions   An options passed to format function as defaults.
 *
 * @returns                  Date format function with defined locales.
 */
export const createFormatDate = (localeData: Arrayable<LocaleObject>, defaultOptions: Options): FormatDate => {
	return (pattern: string, input: Input = new Date(), options?: Partial<Options>) => {
		return _formatDate(pattern, toArray(localeData), input, mergeObjects(defaultOptions, options) as Required<Options>);
	};
};

export const formatDate = createFormatDate([FORMAT_DATE_LOCALE_EN, FORMAT_DATE_LOCALE_RU], { utc: false, locale: 'en' });

export const formatDateRu = createFormatDate(FORMAT_DATE_LOCALE_RU, { utc: false, locale: 'ru' });
export const formatDateEn = createFormatDate(FORMAT_DATE_LOCALE_EN, { utc: false, locale: 'en' });
