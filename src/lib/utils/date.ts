import { format, addDays, setHours, setMinutes, differenceInDays } from 'date-fns';
import locale from 'date-fns/locale/fr/index';

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
 * format a date object to a string
 *
 * @param {Date} date - the date to format
 * @returns {string} the formatted date string
 */
export const formatDateShort = (date: Date): string =>
	format(date, 'E dd/LL/yyyy', {
		locale
	});

/**
 * format a date object to a string
 *
 * @param {Date} date - the date to format
 * @returns {string} the formatted date string
 */
export const formatDateSimple = (date: Date): string => format(date, 'dd/LL/yyyy', { locale });

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

/**
 * calculate the difference between two dates
 *
 * @param {string} begin - the start date
 * @param {number} end - the end date timestamp
 */
export const calculateDiff = (begin: string, end: number): string => {
	const date = new Date(begin);
	const diff = end - date.getTime();

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	let displayTime = '';

	if (hours > 0) {
		displayTime += `${hours}h `;
	}

	if (minutes > 0) {
		displayTime += `${minutes}m `;
	}

	if (seconds > 0) {
		displayTime += `${seconds}s`;
	}

	return displayTime;
};

/**
 * format a date to display the time
 *
 * @param {string} date - the input date
 * @returns {string} the formatted string
 */
export const formatDateTime = (date: string): string =>
	format(new Date(date), 'E HH:mm', {
		locale
	});

/**
 * calculates the number of days between two dates (without factoring hours)
 *
 * @param {string} start - the start date
 * @param {string} end - the end date
 * @returns {number} the number of days between the two dates
 */
export const getDaysBetween = (start: string, end: string): number => {
	const startDate = setHours(setMinutes(new Date(start), 0), 0);
	const endDate = setHours(setMinutes(new Date(end), 0), 24);

	return differenceInDays(endDate, startDate);
};
