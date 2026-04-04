import { describe, it, expect } from 'vitest';
import { getSaleType } from './sales';

describe('getSaleType', () => {
	it('maps each type to its French label', () => {
		expect(getSaleType('toilettage')).toBe('Toilettage');
		expect(getSaleType('surgical_act')).toBe('Acte chirurgical');
		expect(getSaleType('medical_act')).toBe('Acte médical');
		expect(getSaleType('hospit')).toBe('Hospitalisation');
		expect(getSaleType('visit')).toBe('Consultation');
		expect(getSaleType('sale')).toBe('Vente');
	});

	it('returns empty string for unknown types', () => {
		expect(getSaleType('unknown' as never)).toBe('');
	});
});
