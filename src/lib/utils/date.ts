import { format, addDays } from 'date-fns';
import { fr as locale } from 'date-fns/locale';

/**
 * format a timestamp string to a string
 *
 * @param {string} timestamp - the timestamp to format
 * @returns {string} the formatted date string
 */
export const formatDateString = (timestamp: string): string =>
	format(new Date(timestamp), 'EEEE dd/LL/yyyy  HH:mm', {
		locale
	});

/**
 * format a date object to a string
 *
 * @param {Date} date - the date to format
 * @returns {string} the formatted date string
 */
export const formatDate = (date: Date): string =>
	format(date, 'E dd/LL/yyyy  HH:mm', {
		locale
	});

/**
 * format a date object to a string to be used in pocketbase filters.
 *
 * @param {Date} date - the date to format
 * @returns {string} the formatted date string
 */
export const formatFilterDate = (date: Date): string =>
	format(date, 'yyyy-MM-dd HH:mm', { locale });

/**
 * returns the day name of a date
 *
 * @param {Date} date - the date to get the day name
 * @returns {string} the day name.
 */
export const getDateDayName = (date: Date): string => format(date, 'EEEE', { locale });

/**
 * get the previous days of a date
 *
 * @param {Date} date - the start date
 * @returns {Date[]} the previous days of the date
 */
export const getPreviousDays = (date: Date, length: number = 7): Date[] => {
	return Array.from({ length }, (_, i) => addDays(date, -i)).reverse();
};

/**
 * get the previous days labels
 *
 * @param {Date} date - the start date
 * @returns {string[]} the previous days labels
 */
export const getPreviousDaysLabels = (date: Date, length: number = 7): string[] => {
	return getPreviousDays(date, length).map((date) => getDateDayName(date));
};

/**
 * sort dates helper
 *
 * @param {string} start - the start date
 * @param {string} end - the end date
 *
 * @returns {number} the sort result.
 */
export const sortDates = (start: string, end: string): number => {
	return new Date(end).getTime() - new Date(start).getTime();
};
