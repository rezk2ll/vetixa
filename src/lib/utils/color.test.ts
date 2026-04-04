import { describe, it, expect } from 'vitest';
import { getTextColor, getTextColorFromHex } from './color';

describe('getTextColorFromHex', () => {
	it('returns text-black for light backgrounds', () => {
		expect(getTextColorFromHex('#FFFFFF')).toBe('text-black');
		expect(getTextColorFromHex('#FFFF00')).toBe('text-black');
	});

	it('returns text-white for dark backgrounds', () => {
		expect(getTextColorFromHex('#000000')).toBe('text-white');
		expect(getTextColorFromHex('#1a1a2e')).toBe('text-white');
	});

	it('handles mid-range colors', () => {
		expect(getTextColorFromHex('#808080')).toBe('text-white');
		expect(getTextColorFromHex('#333333')).toBe('text-white');
		expect(getTextColorFromHex('#CCCCCC')).toBe('text-black');
	});
});

describe('getTextColor', () => {
	it('delegates to getTextColorFromHex for hex colors', () => {
		expect(getTextColor('#FFFFFF')).toBe('text-black');
		expect(getTextColor('#000000')).toBe('text-white');
	});

	it('returns text-slate-800 for non-hex colors', () => {
		expect(getTextColor('red')).toBe('text-slate-800');
		expect(getTextColor('rgb(0,0,0)')).toBe('text-slate-800');
		expect(getTextColor('')).toBe('text-slate-800');
	});
});
