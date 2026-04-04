import { describe, it, expect } from 'vitest';
import {
	getDaysBetween,
	daysDiff,
	calculateDiff,
	sortDates,
	getPreviousDays,
	getPreviousDaysLabels,
	getMaxSelectionDate,
	formatDateString,
	formatDateStringShortDay,
	formatDateStringShort,
	formatDateStringToTime,
	formatDate,
	formatDateShort,
	formatDateSimple,
	formatFilterDate,
	getDateDayName,
	formatDateTime
} from './date';

describe('getDaysBetween', () => {
	it('returns 0 for same-day start and end', () => {
		expect(getDaysBetween('2024-01-15T08:00:00', '2024-01-15T20:00:00')).toBe(0);
	});

	it('returns 1 for overnight stay (1 night)', () => {
		expect(getDaysBetween('2024-01-15T08:00:00', '2024-01-16T08:00:00')).toBe(1);
	});

	it('returns 2 for a 2-night stay', () => {
		expect(getDaysBetween('2024-01-15T08:00:00', '2024-01-17T08:00:00')).toBe(2);
	});

	it('returns correct days for longer stays', () => {
		expect(getDaysBetween('2024-01-15T08:00:00', '2024-01-20T08:00:00')).toBe(5);
	});

	it('handles dates with milliseconds', () => {
		expect(getDaysBetween('2024-01-15T08:00:00.123', '2024-01-17T20:00:00.456')).toBe(2);
	});

	it('returns 0 when start equals end', () => {
		expect(getDaysBetween('2024-01-15T08:00:00', '2024-01-15T08:00:00')).toBe(0);
	});

	it('returns 0 when end is before start (negative result clamped)', () => {
		expect(getDaysBetween('2024-01-17T08:00:00', '2024-01-15T08:00:00')).toBe(0);
	});
});

describe('daysDiff', () => {
	it('returns 0 for same day', () => {
		expect(daysDiff('2024-01-15T08:00:00', '2024-01-15T20:00:00')).toBe(0);
	});

	it('returns 1 for consecutive days', () => {
		expect(daysDiff('2024-01-15T08:00:00', '2024-01-16T08:00:00')).toBe(1);
	});

	it('returns negative for reversed dates', () => {
		expect(daysDiff('2024-01-17T08:00:00', '2024-01-15T08:00:00')).toBe(-2);
	});

	it('returns correct value for multi-day span', () => {
		expect(daysDiff('2024-01-15T00:00:00', '2024-01-20T00:00:00')).toBe(5);
	});
});

describe('calculateDiff', () => {
	it('formats hours, minutes, and seconds', () => {
		const start = '2024-01-15T10:00:00';
		const end = new Date('2024-01-15T12:30:45').getTime();
		expect(calculateDiff(start, end)).toBe('2h 30m 45s');
	});

	it('omits hours when zero', () => {
		const start = '2024-01-15T10:00:00';
		const end = new Date('2024-01-15T10:05:30').getTime();
		expect(calculateDiff(start, end)).toBe('5m 30s');
	});

	it('omits minutes when zero', () => {
		const start = '2024-01-15T10:00:00';
		const end = new Date('2024-01-15T11:00:10').getTime();
		expect(calculateDiff(start, end)).toBe('1h 10s');
	});

	it('returns empty string for zero diff', () => {
		const start = '2024-01-15T10:00:00';
		const end = new Date('2024-01-15T10:00:00').getTime();
		expect(calculateDiff(start, end)).toBe('');
	});
});

describe('sortDates', () => {
	it('returns positive when end is after start', () => {
		expect(sortDates('2024-01-15', '2024-01-20')).toBeGreaterThan(0);
	});

	it('returns negative when end is before start', () => {
		expect(sortDates('2024-01-20', '2024-01-15')).toBeLessThan(0);
	});

	it('returns 0 for equal dates', () => {
		expect(sortDates('2024-01-15', '2024-01-15')).toBe(0);
	});
});

describe('formatDateString', () => {
	it('formats a timestamp with full day name and time', () => {
		const result = formatDateString('2024-01-15T10:30:00');
		expect(result).toMatch(/lundi/);
		expect(result).toContain('15/01/2024');
		expect(result).toContain('10:30');
	});
});

describe('formatDateStringShortDay', () => {
	it('formats with abbreviated day', () => {
		const result = formatDateStringShortDay('2024-01-15T10:30:00');
		expect(result).toContain('15/01/2024');
		expect(result).toContain('10:30');
	});
});

describe('formatDateStringShort', () => {
	it('formats date without time', () => {
		const result = formatDateStringShort('2024-01-15T10:30:00');
		expect(result).toContain('15/01/2024');
		expect(result).not.toContain('10:30');
	});
});

describe('formatDateStringToTime', () => {
	it('returns time only', () => {
		expect(formatDateStringToTime('2024-01-15T10:30:00')).toBe('10:30');
	});
});

describe('formatDate', () => {
	it('formats a Date object with time', () => {
		const result = formatDate(new Date('2024-01-15T10:30:00'));
		expect(result).toContain('15/01/2024');
		expect(result).toContain('10:30');
	});
});

describe('formatDateShort', () => {
	it('formats a Date object without time', () => {
		const result = formatDateShort(new Date('2024-01-15'));
		expect(result).toContain('15/01/2024');
	});
});

describe('formatDateSimple', () => {
	it('formats date in dd/MM/yyyy', () => {
		expect(formatDateSimple(new Date('2024-01-15'))).toBe('15/01/2024');
	});
});

describe('formatFilterDate', () => {
	it('formats for PocketBase filter', () => {
		const result = formatFilterDate(new Date('2024-01-15T10:30:00'));
		expect(result).toBe('2024-01-15 10:30');
	});
});

describe('getDateDayName', () => {
	it('returns French day name', () => {
		expect(getDateDayName(new Date('2024-01-15'))).toBe('lundi');
	});
});

describe('formatDateTime', () => {
	it('returns day and time', () => {
		const result = formatDateTime('2024-01-15T10:30:00');
		expect(result).toContain('10:30');
	});
});

describe('getPreviousDaysLabels', () => {
	it('returns day name labels', () => {
		const result = getPreviousDaysLabels(new Date('2024-01-15'), 3);
		expect(result).toHaveLength(3);
		expect(result[2]).toBe('lundi');
	});
});

describe('getMaxSelectionDate', () => {
	it('returns a date 100 years in the future', () => {
		const result = getMaxSelectionDate();
		const now = new Date();
		expect(result.getFullYear()).toBe(now.getFullYear() + 100);
	});
});

describe('getPreviousDays', () => {
	it('returns 7 days by default ending at the given date', () => {
		const date = new Date('2024-01-15');
		const result = getPreviousDays(date);
		expect(result).toHaveLength(7);
		expect(result[6].toDateString()).toBe(date.toDateString());
	});

	it('respects custom length', () => {
		const date = new Date('2024-01-15');
		const result = getPreviousDays(date, 3);
		expect(result).toHaveLength(3);
	});

	it('returns dates in chronological order', () => {
		const date = new Date('2024-01-15');
		const result = getPreviousDays(date, 5);
		for (let i = 1; i < result.length; i++) {
			expect(result[i].getTime()).toBeGreaterThan(result[i - 1].getTime());
		}
	});
});
