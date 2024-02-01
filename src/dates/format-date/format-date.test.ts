import { formatDateRu, formatDateEn } from './format-date';

describe('format-date', () => {
	const RANDOM_DATE = new Date(2015, 4, 11, 18, 2, 35);
	const FIRST_DAY_OF_2024 = new Date(2024, 0, 1, 0, 0, 0);
	const LAST_DAY_OF_2023 = new Date(2023, 11, 31, 23, 59, 59);

	describe('En', () => {
		it('Properly formats `yy` (2-digits representation of the year)', () => {
			expect(formatDateEn('yy', RANDOM_DATE)).toBe('15');
			expect(formatDateEn('yy', FIRST_DAY_OF_2024)).toBe('24');
			expect(formatDateEn('yy', LAST_DAY_OF_2023)).toBe('23');
		});

		it('Properly formats `yyyy` (4-digits representation of the year)', () => {
			expect(formatDateEn('yyyy', RANDOM_DATE)).toBe('2015');
			expect(formatDateEn('yyyy', FIRST_DAY_OF_2024)).toBe('2024');
			expect(formatDateEn('yyyy', LAST_DAY_OF_2023)).toBe('2023');
		});

		it('Properly formats `L` (standalone numeric representation of month)', () => {
			expect(formatDateEn('L', RANDOM_DATE)).toBe('5');
			expect(formatDateEn('L', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateEn('L', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `LL` (standalone numeric representation of month with leading zero)', () => {
			expect(formatDateEn('LL', RANDOM_DATE)).toBe('05');
			expect(formatDateEn('LL', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateEn('LL', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `LLL` (standalone abbreviated month name)', () => {
			expect(formatDateEn('LLL', RANDOM_DATE)).toBe('May');
			expect(formatDateEn('LLL', FIRST_DAY_OF_2024)).toBe('Jan');
			expect(formatDateEn('LLL', LAST_DAY_OF_2023)).toBe('Dec');
		});

		it('Properly formats `_LLL` (standalone abbreviated month name lowercased)', () => {
			expect(formatDateEn('_LLL', RANDOM_DATE)).toBe('may');
			expect(formatDateEn('_LLL', FIRST_DAY_OF_2024)).toBe('jan');
			expect(formatDateEn('_LLL', LAST_DAY_OF_2023)).toBe('dec');
		});

		it('Properly formats `LLLL` (standalone wide month name)', () => {
			expect(formatDateEn('LLLL', RANDOM_DATE)).toBe('May');
			expect(formatDateEn('LLLL', FIRST_DAY_OF_2024)).toBe('January');
			expect(formatDateEn('LLLL', LAST_DAY_OF_2023)).toBe('December');
		});

		it('Properly formats `_LLLL` (standalone wide month name lowercased)', () => {
			expect(formatDateEn('_LLLL', RANDOM_DATE)).toBe('may');
			expect(formatDateEn('_LLLL', FIRST_DAY_OF_2024)).toBe('january');
			expect(formatDateEn('_LLLL', LAST_DAY_OF_2023)).toBe('december');
		});

		it('Properly formats `M` (formatted numeric representation of month)', () => {
			expect(formatDateEn('M', RANDOM_DATE)).toBe('5');
			expect(formatDateEn('M', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateEn('M', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `MM` (formatted numeric representation of month with leading zero)', () => {
			expect(formatDateEn('MM', RANDOM_DATE)).toBe('05');
			expect(formatDateEn('MM', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateEn('MM', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `MMM` (formatted abbreviated month name)', () => {
			expect(formatDateEn('MMM', RANDOM_DATE)).toBe('May');
			expect(formatDateEn('MMM', FIRST_DAY_OF_2024)).toBe('Jan');
			expect(formatDateEn('MMM', LAST_DAY_OF_2023)).toBe('Dec');
		});

		it('Properly formats `_MMM` (formatted abbreviated month name lowercased)', () => {
			expect(formatDateEn('_MMM', RANDOM_DATE)).toBe('may');
			expect(formatDateEn('_MMM', FIRST_DAY_OF_2024)).toBe('jan');
			expect(formatDateEn('_MMM', LAST_DAY_OF_2023)).toBe('dec');
		});

		it('Properly formats `MMMM` (formatted wide month name)', () => {
			expect(formatDateEn('MMMM', RANDOM_DATE)).toBe('May');
			expect(formatDateEn('MMMM', FIRST_DAY_OF_2024)).toBe('January');
			expect(formatDateEn('MMMM', LAST_DAY_OF_2023)).toBe('December');
		});

		it('Properly formats `_MMMM` (formatted wide month name lowercased)', () => {
			expect(formatDateEn('_MMMM', RANDOM_DATE)).toBe('may');
			expect(formatDateEn('_MMMM', FIRST_DAY_OF_2024)).toBe('january');
			expect(formatDateEn('_MMMM', LAST_DAY_OF_2023)).toBe('december');
		});

		it('Properly formats `c` (standalone local week day index)', () => {
			expect(formatDateEn('c', RANDOM_DATE)).toBe('2');
			expect(formatDateEn('c', FIRST_DAY_OF_2024)).toBe('2');
			expect(formatDateEn('c', LAST_DAY_OF_2023)).toBe('1');
		});

		it('Properly formats `cc` (standalone padded local week day index)', () => {
			expect(formatDateEn('cc', RANDOM_DATE)).toBe('02');
			expect(formatDateEn('cc', FIRST_DAY_OF_2024)).toBe('02');
			expect(formatDateEn('cc', LAST_DAY_OF_2023)).toBe('01');
		});

		it('Properly formats `ccc` (standalone abbreviated local week day name)', () => {
			expect(formatDateEn('ccc', RANDOM_DATE)).toBe('Mon');
			expect(formatDateEn('ccc', FIRST_DAY_OF_2024)).toBe('Mon');
			expect(formatDateEn('ccc', LAST_DAY_OF_2023)).toBe('Sun');
		});

		it('Properly formats `_ccc` (standalone lowercased abbreviated local week day name)', () => {
			expect(formatDateEn('_ccc', RANDOM_DATE)).toBe('mon');
			expect(formatDateEn('_ccc', FIRST_DAY_OF_2024)).toBe('mon');
			expect(formatDateEn('_ccc', LAST_DAY_OF_2023)).toBe('sun');
		});

		it('Properly formats `cccc` (standalone wide local week day name)', () => {
			expect(formatDateEn('cccc', RANDOM_DATE)).toBe('Monday');
			expect(formatDateEn('cccc', FIRST_DAY_OF_2024)).toBe('Monday');
			expect(formatDateEn('cccc', LAST_DAY_OF_2023)).toBe('Sunday');
		});

		it('Properly formats `_cccc` (standalone lowercased wide local week day name)', () => {
			expect(formatDateEn('_cccc', RANDOM_DATE)).toBe('monday');
			expect(formatDateEn('_cccc', FIRST_DAY_OF_2024)).toBe('monday');
			expect(formatDateEn('_cccc', LAST_DAY_OF_2023)).toBe('sunday');
		});

		it('Properly formats `e` (formatted local week day index)', () => {
			expect(formatDateEn('e', RANDOM_DATE)).toBe('2');
			expect(formatDateEn('e', FIRST_DAY_OF_2024)).toBe('2');
			expect(formatDateEn('e', LAST_DAY_OF_2023)).toBe('1');
		});

		it('Properly formats `ee` (formatted padded local week day index)', () => {
			expect(formatDateEn('ee', RANDOM_DATE)).toBe('02');
			expect(formatDateEn('ee', FIRST_DAY_OF_2024)).toBe('02');
			expect(formatDateEn('ee', LAST_DAY_OF_2023)).toBe('01');
		});

		it('Properly formats `eee` (formatted abbreviated local week day name)', () => {
			expect(formatDateEn('eee', RANDOM_DATE)).toBe('Mon');
			expect(formatDateEn('eee', FIRST_DAY_OF_2024)).toBe('Mon');
			expect(formatDateEn('eee', LAST_DAY_OF_2023)).toBe('Sun');
		});

		it('Properly formats `_eee` (formatted lowercased abbreviated local week day name)', () => {
			expect(formatDateEn('_eee', RANDOM_DATE)).toBe('mon');
			expect(formatDateEn('_eee', FIRST_DAY_OF_2024)).toBe('mon');
			expect(formatDateEn('_eee', LAST_DAY_OF_2023)).toBe('sun');
		});

		it('Properly formats `eeee` (formatted wide local week day name)', () => {
			expect(formatDateEn('eeee', RANDOM_DATE)).toBe('Monday');
			expect(formatDateEn('eeee', FIRST_DAY_OF_2024)).toBe('Monday');
			expect(formatDateEn('eeee', LAST_DAY_OF_2023)).toBe('Sunday');
		});

		it('Properly formats `_eeee` (formatted lowercased wide local week day name)', () => {
			expect(formatDateEn('_eeee', RANDOM_DATE)).toBe('monday');
			expect(formatDateEn('_eeee', FIRST_DAY_OF_2024)).toBe('monday');
			expect(formatDateEn('_eeee', LAST_DAY_OF_2023)).toBe('sunday');
		});

		it('Properly formats `d` (numeric day of month)', () => {
			expect(formatDateEn('d', RANDOM_DATE)).toBe('11');
			expect(formatDateEn('d', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateEn('d', LAST_DAY_OF_2023)).toBe('31');
		});

		it('Properly formats `dd` (padded day of month)', () => {
			expect(formatDateEn('dd', RANDOM_DATE)).toBe('11');
			expect(formatDateEn('dd', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateEn('dd', LAST_DAY_OF_2023)).toBe('31');
		});

		it('Properly formats `h` (numeric hour in range [1..12])', () => {
			expect(formatDateEn('h', RANDOM_DATE)).toBe('6');
			expect(formatDateEn('h', FIRST_DAY_OF_2024)).toBe('12');
			expect(formatDateEn('h', LAST_DAY_OF_2023)).toBe('11');
		});

		it('Properly formats `H` (numeric hour in range [0..23])', () => {
			expect(formatDateEn('H', RANDOM_DATE)).toBe('18');
			expect(formatDateEn('H', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateEn('H', LAST_DAY_OF_2023)).toBe('23');
		});

		it('Properly formats `m` (numeric minutes)', () => {
			expect(formatDateEn('m', RANDOM_DATE)).toBe('2');
			expect(formatDateEn('m', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateEn('m', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `mm` (padded minutes)', () => {
			expect(formatDateEn('mm', RANDOM_DATE)).toBe('02');
			expect(formatDateEn('mm', FIRST_DAY_OF_2024)).toBe('00');
			expect(formatDateEn('mm', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `s` (numeric seconds)', () => {
			expect(formatDateEn('s', RANDOM_DATE)).toBe('35');
			expect(formatDateEn('s', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateEn('s', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `ss` (padded seconds)', () => {
			expect(formatDateEn('ss', RANDOM_DATE)).toBe('35');
			expect(formatDateEn('ss', FIRST_DAY_OF_2024)).toBe('00');
			expect(formatDateEn('ss', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `X` (minimal timezone)', () => {
			expect(formatDateEn('X', RANDOM_DATE)).toBe('+03');
		});

		it('Properly formats `XX` (basic timezone)', () => {
			expect(formatDateEn('XX', RANDOM_DATE)).toBe('+0300');
		});

		it('Properly formats `XXX` (extended timezone)', () => {
			expect(formatDateEn('XXX', RANDOM_DATE)).toBe('+03:00');
		});

		it('Remains content in square brackets and spaces as is', () => {
			expect(formatDateEn('[The date is] MM/dd/yyyy   [foobar]  dd', RANDOM_DATE)).toBe('The date is 05/11/2015   foobar  11');
		});

		it('Complex test', () => {
			expect(formatDateEn('[The date is] MM/dd/yyyy, [today is] eeee', RANDOM_DATE)).toBe('The date is 05/11/2015, today is Monday');
			//
			expect(formatDateEn('yyyy-MM-ddTHH:mm:ssXXX', RANDOM_DATE)).toBe('2015-05-11T18:02:35+03:00');
			expect(formatDateEn('yyyy-MM-ddTHH:mm:ssXXX', RANDOM_DATE, { utc: true })).toBe('2015-05-11T15:02:35Z');
		});
	});

	describe('Ru', () => {
		it('Properly formats `yy` (2-digits representation of the year)', () => {
			expect(formatDateRu('yy', RANDOM_DATE)).toBe('15');
			expect(formatDateRu('yy', FIRST_DAY_OF_2024)).toBe('24');
			expect(formatDateRu('yy', LAST_DAY_OF_2023)).toBe('23');
		});

		it('Properly formats `yyyy` (4-digits representation of the year)', () => {
			expect(formatDateRu('yyyy', RANDOM_DATE)).toBe('2015');
			expect(formatDateRu('yyyy', FIRST_DAY_OF_2024)).toBe('2024');
			expect(formatDateRu('yyyy', LAST_DAY_OF_2023)).toBe('2023');
		});

		it('Properly formats `L` (standalone numeric representation of month)', () => {
			expect(formatDateRu('L', RANDOM_DATE)).toBe('5');
			expect(formatDateRu('L', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateRu('L', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `LL` (standalone numeric representation of month with leading zero)', () => {
			expect(formatDateRu('LL', RANDOM_DATE)).toBe('05');
			expect(formatDateRu('LL', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateRu('LL', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `LLL` (standalone abbreviated month name)', () => {
			expect(formatDateRu('LLL', RANDOM_DATE)).toBe('Май');
			expect(formatDateRu('LLL', FIRST_DAY_OF_2024)).toBe('Янв');
			expect(formatDateRu('LLL', LAST_DAY_OF_2023)).toBe('Дек');
		});

		it('Properly formats `_LLL` (standalone abbreviated month name lowercased)', () => {
			expect(formatDateRu('_LLL', RANDOM_DATE)).toBe('май');
			expect(formatDateRu('_LLL', FIRST_DAY_OF_2024)).toBe('янв');
			expect(formatDateRu('_LLL', LAST_DAY_OF_2023)).toBe('дек');
		});

		it('Properly formats `LLLL` (standalone wide month name)', () => {
			expect(formatDateRu('LLLL', RANDOM_DATE)).toBe('Май');
			expect(formatDateRu('LLLL', FIRST_DAY_OF_2024)).toBe('Январь');
			expect(formatDateRu('LLLL', LAST_DAY_OF_2023)).toBe('Декабрь');
		});

		it('Properly formats `_LLLL` (standalone wide month name lowercased)', () => {
			expect(formatDateRu('_LLLL', RANDOM_DATE)).toBe('май');
			expect(formatDateRu('_LLLL', FIRST_DAY_OF_2024)).toBe('январь');
			expect(formatDateRu('_LLLL', LAST_DAY_OF_2023)).toBe('декабрь');
		});

		it('Properly formats `M` (formatted numeric representation of month)', () => {
			expect(formatDateRu('M', RANDOM_DATE)).toBe('5');
			expect(formatDateRu('M', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateRu('M', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `MM` (formatted numeric representation of month with leading zero)', () => {
			expect(formatDateRu('MM', RANDOM_DATE)).toBe('05');
			expect(formatDateRu('MM', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateRu('MM', LAST_DAY_OF_2023)).toBe('12');
		});

		it('Properly formats `MMM` (formatted abbreviated month name)', () => {
			expect(formatDateRu('MMM', RANDOM_DATE)).toBe('Май');
			expect(formatDateRu('MMM', FIRST_DAY_OF_2024)).toBe('Янв');
			expect(formatDateRu('MMM', LAST_DAY_OF_2023)).toBe('Дек');
		});

		it('Properly formats `_MMM` (formatted abbreviated month name lowercased)', () => {
			expect(formatDateRu('_MMM', RANDOM_DATE)).toBe('май');
			expect(formatDateRu('_MMM', FIRST_DAY_OF_2024)).toBe('янв');
			expect(formatDateRu('_MMM', LAST_DAY_OF_2023)).toBe('дек');
		});

		it('Properly formats `MMMM` (formatted wide month name)', () => {
			expect(formatDateRu('MMMM', RANDOM_DATE)).toBe('Мая');
			expect(formatDateRu('MMMM', FIRST_DAY_OF_2024)).toBe('Января');
			expect(formatDateRu('MMMM', LAST_DAY_OF_2023)).toBe('Декабря');
		});

		it('Properly formats `_MMMM` (formatted wide month name lowercased)', () => {
			expect(formatDateRu('_MMMM', RANDOM_DATE)).toBe('мая');
			expect(formatDateRu('_MMMM', FIRST_DAY_OF_2024)).toBe('января');
			expect(formatDateRu('_MMMM', LAST_DAY_OF_2023)).toBe('декабря');
		});

		it('Properly formats `c` (standalone local week day index)', () => {
			expect(formatDateRu('c', RANDOM_DATE)).toBe('1');
			expect(formatDateRu('c', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateRu('c', LAST_DAY_OF_2023)).toBe('7');
		});

		it('Properly formats `cc` (standalone padded local week day index)', () => {
			expect(formatDateRu('cc', RANDOM_DATE)).toBe('01');
			expect(formatDateRu('cc', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateRu('cc', LAST_DAY_OF_2023)).toBe('07');
		});

		it('Properly formats `ccc` (standalone abbreviated local week day name)', () => {
			expect(formatDateRu('ccc', RANDOM_DATE)).toBe('Пн');
			expect(formatDateRu('ccc', FIRST_DAY_OF_2024)).toBe('Пн');
			expect(formatDateRu('ccc', LAST_DAY_OF_2023)).toBe('Вс');
		});

		it('Properly formats `_ccc` (standalone lowercased abbreviated local week day name)', () => {
			expect(formatDateRu('_ccc', RANDOM_DATE)).toBe('пн');
			expect(formatDateRu('_ccc', FIRST_DAY_OF_2024)).toBe('пн');
			expect(formatDateRu('_ccc', LAST_DAY_OF_2023)).toBe('вс');
		});

		it('Properly formats `cccc` (standalone wide local week day name)', () => {
			expect(formatDateRu('cccc', RANDOM_DATE)).toBe('Понедельник');
			expect(formatDateRu('cccc', FIRST_DAY_OF_2024)).toBe('Понедельник');
			expect(formatDateRu('cccc', LAST_DAY_OF_2023)).toBe('Воскресенье');
		});

		it('Properly formats `_cccc` (standalone lowercased wide local week day name)', () => {
			expect(formatDateRu('_cccc', RANDOM_DATE)).toBe('понедельник');
			expect(formatDateRu('_cccc', FIRST_DAY_OF_2024)).toBe('понедельник');
			expect(formatDateRu('_cccc', LAST_DAY_OF_2023)).toBe('воскресенье');
		});

		it('Properly formats `e` (formatted local week day index)', () => {
			expect(formatDateRu('e', RANDOM_DATE)).toBe('1');
			expect(formatDateRu('e', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateRu('e', LAST_DAY_OF_2023)).toBe('7');
		});

		it('Properly formats `ee` (formatted padded local week day index)', () => {
			expect(formatDateRu('ee', RANDOM_DATE)).toBe('01');
			expect(formatDateRu('ee', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateRu('ee', LAST_DAY_OF_2023)).toBe('07');
		});

		it('Properly formats `eee` (formatted abbreviated local week day name)', () => {
			expect(formatDateRu('eee', RANDOM_DATE)).toBe('Пн');
			expect(formatDateRu('eee', FIRST_DAY_OF_2024)).toBe('Пн');
			expect(formatDateRu('eee', LAST_DAY_OF_2023)).toBe('Вс');
		});

		it('Properly formats `_eee` (formatted lowercased abbreviated local week day name)', () => {
			expect(formatDateRu('_eee', RANDOM_DATE)).toBe('пн');
			expect(formatDateRu('_eee', FIRST_DAY_OF_2024)).toBe('пн');
			expect(formatDateRu('_eee', LAST_DAY_OF_2023)).toBe('вс');
		});

		it('Properly formats `eeee` (formatted wide local week day name)', () => {
			expect(formatDateRu('eeee', RANDOM_DATE)).toBe('В понедельник');
			expect(formatDateRu('eeee', FIRST_DAY_OF_2024)).toBe('В понедельник');
			expect(formatDateRu('eeee', LAST_DAY_OF_2023)).toBe('В воскресенье');
		});

		it('Properly formats `_eeee` (formatted lowercased wide local week day name)', () => {
			expect(formatDateRu('_eeee', RANDOM_DATE)).toBe('в понедельник');
			expect(formatDateRu('_eeee', FIRST_DAY_OF_2024)).toBe('в понедельник');
			expect(formatDateRu('_eeee', LAST_DAY_OF_2023)).toBe('в воскресенье');
		});

		it('Properly formats `d` (numeric day of month)', () => {
			expect(formatDateRu('d', RANDOM_DATE)).toBe('11');
			expect(formatDateRu('d', FIRST_DAY_OF_2024)).toBe('1');
			expect(formatDateRu('d', LAST_DAY_OF_2023)).toBe('31');
		});

		it('Properly formats `dd` (padded day of month)', () => {
			expect(formatDateRu('dd', RANDOM_DATE)).toBe('11');
			expect(formatDateRu('dd', FIRST_DAY_OF_2024)).toBe('01');
			expect(formatDateRu('dd', LAST_DAY_OF_2023)).toBe('31');
		});

		it('Properly formats `h` (numeric hour in range [1..12])', () => {
			expect(formatDateRu('h', RANDOM_DATE)).toBe('6');
			expect(formatDateRu('h', FIRST_DAY_OF_2024)).toBe('12');
			expect(formatDateRu('h', LAST_DAY_OF_2023)).toBe('11');
		});

		it('Properly formats `H` (numeric hour in range [0..23])', () => {
			expect(formatDateRu('H', RANDOM_DATE)).toBe('18');
			expect(formatDateRu('H', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateRu('H', LAST_DAY_OF_2023)).toBe('23');
		});

		it('Properly formats `m` (numeric minutes)', () => {
			expect(formatDateRu('m', RANDOM_DATE)).toBe('2');
			expect(formatDateRu('m', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateRu('m', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `mm` (padded minutes)', () => {
			expect(formatDateRu('mm', RANDOM_DATE)).toBe('02');
			expect(formatDateRu('mm', FIRST_DAY_OF_2024)).toBe('00');
			expect(formatDateRu('mm', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `s` (numeric seconds)', () => {
			expect(formatDateRu('s', RANDOM_DATE)).toBe('35');
			expect(formatDateRu('s', FIRST_DAY_OF_2024)).toBe('0');
			expect(formatDateRu('s', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `ss` (padded seconds)', () => {
			expect(formatDateRu('ss', RANDOM_DATE)).toBe('35');
			expect(formatDateRu('ss', FIRST_DAY_OF_2024)).toBe('00');
			expect(formatDateRu('ss', LAST_DAY_OF_2023)).toBe('59');
		});

		it('Properly formats `X` (minimal timezone)', () => {
			expect(formatDateRu('X', RANDOM_DATE)).toBe('+03');
		});

		it('Properly formats `XX` (basic timezone)', () => {
			expect(formatDateRu('XX', RANDOM_DATE)).toBe('+0300');
		});

		it('Properly formats `XXX` (extended timezone)', () => {
			expect(formatDateRu('XXX', RANDOM_DATE)).toBe('+03:00');
		});

		it('Remains content in square brackets and spaces as is', () => {
			expect(formatDateEn('[Сегодня] dd.MM.yyyy   [foobar]  dd', RANDOM_DATE)).toBe('Сегодня 11.05.2015   foobar  11');
		});

		it('Complex test', () => {
			expect(formatDateRu('Сегодня dd _MMMM yyyy года, _cccc. Доставка будет произведена _eeee около HH:mm', RANDOM_DATE))
				.toBe('Сегодня 11 мая 2015 года, понедельник. Доставка будет произведена в понедельник около 18:02');
			//
			expect(formatDateEn('yyyy-MM-ddTHH:mm:ssXXX', RANDOM_DATE)).toBe('2015-05-11T18:02:35+03:00');
			expect(formatDateEn('yyyy-MM-ddTHH:mm:ssXXX', RANDOM_DATE, { utc: true })).toBe('2015-05-11T15:02:35Z');
		});
	});

	describe('UTC & various input', () => {
		it('Works in UTC mode using various input type', () => {
			expect(formatDateEn('MM/dd/yyyy HH:mm:ss', LAST_DAY_OF_2023, { utc: true })).toBe('12/31/2023 20:59:59');
			expect(formatDateEn('MM/dd/yyyy HH:mm:ss', '12/31/2023 23:59:59', { utc: true })).toBe('12/31/2023 20:59:59');
			expect(formatDateEn('MM/dd/yyyy HH:mm:ss', '2023-12-31T23:59:59', { utc: true })).toBe('12/31/2023 20:59:59');
			expect(formatDateEn('MM/dd/yyyy HH:mm:ss', '2023-12-31T23:59:59')).toBe('12/31/2023 23:59:59');
			expect(formatDateEn('HH:mm:ss', (5 * 3600 + 30) * 1000)).toBe('05:00:30');
			expect(formatDateEn('HH:mm:ss', (5 * 3600 + 30) * 1000, { utc: true })).toBe('02:00:30');
		});
	});
});
