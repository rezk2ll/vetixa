import { describe, it, expect } from 'vitest';
import { addFundsSchema } from './funds';

describe('addFundsSchema', () => {
	it('accepts valid fund data', () => {
		const result = addFundsSchema.safeParse({
			amount: 100,
			method: 'cash',
			description: 'Paiement consultation'
		});
		expect(result.success).toBe(true);
	});

	it('rejects zero amount', () => {
		const result = addFundsSchema.safeParse({
			amount: 0,
			method: 'cash',
			description: 'test'
		});
		expect(result.success).toBe(false);
	});

	it('rejects negative amount', () => {
		const result = addFundsSchema.safeParse({
			amount: -10,
			method: 'cash',
			description: 'test'
		});
		expect(result.success).toBe(false);
	});

	it('coerces string amount to number', () => {
		const result = addFundsSchema.safeParse({
			amount: '50',
			method: 'cash',
			description: 'test'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.amount).toBe(50);
		}
	});

	it('coerces string incash and outcash to numbers', () => {
		const result = addFundsSchema.safeParse({
			amount: 100,
			method: 'cash',
			incash: '200',
			outcash: '100',
			description: 'test'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.incash).toBe(200);
			expect(result.data.outcash).toBe(100);
		}
	});

	it('defaults method to cash', () => {
		const result = addFundsSchema.safeParse({
			amount: 100,
			description: 'test'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.method).toBe('cash');
		}
	});
});
