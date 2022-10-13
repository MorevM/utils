/**
 * Retrieves scrollbar width of element with body as default.
 *
 * @param   el   Element to retrieve its scrollbar width.
 * @returns        Scrollbar width in `px`.
 */
export const getScrollbarWidth = (el: HTMLElement = document.body): number => {
	return el === document.body
		? window.innerWidth - document.documentElement.clientWidth
		: el.offsetWidth - el.clientWidth;
};
