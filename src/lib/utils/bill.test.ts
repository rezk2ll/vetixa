import { describe, it, expect } from 'vitest';
import { toWords } from './bill';

describe('toWords', () => {
	it('converts a number to French words with TND currency', () => {
		const result = toWords.convert(100);
		expect(result).toContain('Cent');
		expect(result).toContain('Dinar');
	});

	it('handles decimal amounts', () => {
		const result = toWords.convert(1.5);
		expect(result).toContain('millime');
	});

	it('handles zero', () => {
		const result = toWords.convert(0);
		expect(result).toContain('Dinar');
	});
});
