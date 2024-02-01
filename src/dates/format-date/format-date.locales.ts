import type { LocaleObject } from './format-date.types';

export const FORMAT_DATE_LOCALE_EN: LocaleObject = {
	name: 'en',
	values: {
		firstDayOfWeekIndex: 0,
		dayNames: {
			abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		},
		monthNames: {
			abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		},
	},
};

export const FORMAT_DATE_LOCALE_RU: LocaleObject = {
	name: 'ru',
	values: {
		firstDayOfWeekIndex: 1,
		dayNames: {
			abbreviated: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			wide: [
				['Воскресенье', 'В воскресенье'],
				['Понедельник', 'В понедельник'],
				['Вторник', 'Во вторник'],
				['Среда', 'В среду'],
				['Четверг', 'В четверг'],
				['Пятница', 'В пятницу'],
				['Суббота', 'В субботу'],
			],
		},
		monthNames: {
			abbreviated: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			wide: [
				['Январь', 'Января'],
				['Февраль', 'Февраля'],
				['Март', 'Марта'],
				['Апрель', 'Апреля'],
				['Май', 'Мая'],
				['Июнь', 'Июня'],
				['Июль', 'Июля'],
				['Август', 'Августа'],
				['Сентябрь', 'Сентября'],
				['Октябрь', 'Октября'],
				['Ноябрь', 'Ноября'],
				['Декабрь', 'Декабря'],
			],
		},
	},
};
