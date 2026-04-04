import { describe, it, expect } from 'vitest';
import { cageCompare } from './cage';
import type { CageItem } from '$types';

const cage = (code: string) => ({ code }) as CageItem;

describe('cageCompare', () => {
	it('sorts alphabetically by prefix', () => {
		expect(cageCompare(cage('A1'), cage('B1'))).toBeLessThan(0);
		expect(cageCompare(cage('B1'), cage('A1'))).toBeGreaterThan(0);
	});

	it('sorts numerically within the same prefix', () => {
		expect(cageCompare(cage('A1'), cage('A2'))).toBeLessThan(0);
		expect(cageCompare(cage('A10'), cage('A2'))).toBeGreaterThan(0);
	});

	it('returns 0 for equal codes', () => {
		expect(cageCompare(cage('A1'), cage('A1'))).toBe(0);
	});

	it('is case-insensitive', () => {
		expect(cageCompare(cage('a1'), cage('A1'))).toBe(0);
	});

	it('handles codes without numbers', () => {
		expect(cageCompare(cage('A'), cage('B'))).toBeLessThan(0);
	});

	it('handles codes without prefix', () => {
		expect(cageCompare(cage('1'), cage('2'))).toBeLessThan(0);
		expect(cageCompare(cage('10'), cage('2'))).toBeGreaterThan(0);
	});

	it('sorts a mixed array correctly', () => {
		const cages = [cage('B2'), cage('A10'), cage('A2'), cage('B1'), cage('A1')];
		cages.sort(cageCompare);
		expect(cages.map((c) => c.code)).toEqual(['A1', 'A2', 'A10', 'B1', 'B2']);
	});
});
