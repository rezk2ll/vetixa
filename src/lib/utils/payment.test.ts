import { describe, it, expect } from 'vitest';
import { paymentMethods, getPaymentMethodLabel } from './payment';

describe('paymentMethods', () => {
	it('contains all expected methods', () => {
		const values = paymentMethods.map((m) => m.value);
		expect(values).toEqual(['cash', 'tpe', 'cheque', 'virement']);
	});
});

describe('getPaymentMethodLabel', () => {
	it('returns the French label for known methods', () => {
		expect(getPaymentMethodLabel('cash')).toBe('Espèces');
		expect(getPaymentMethodLabel('tpe')).toBe('TPE');
		expect(getPaymentMethodLabel('cheque')).toBe('Chèque');
		expect(getPaymentMethodLabel('virement')).toBe('Virement');
	});

	it('returns the input string for unknown methods', () => {
		expect(getPaymentMethodLabel('bitcoin')).toBe('bitcoin');
	});
});
