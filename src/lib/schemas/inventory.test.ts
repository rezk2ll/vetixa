import { describe, it, expect } from 'vitest';
import {
	addInventoryItemSchema,
	sellInventoryItemSchema,
	updateInventoryItemSchema
} from './inventory';

const validItem = {
	name: 'Vaccin antirabique',
	quantity: 10,
	price: 25,
	cost: 15,
	alert: 5,
	tva: 19,
	gain: 10,
	code: 'VAC001'
};

describe('addInventoryItemSchema', () => {
	it('accepts valid inventory item', () => {
		const result = addInventoryItemSchema.safeParse(validItem);
		expect(result.success).toBe(true);
	});

	it('rejects name shorter than 3 characters', () => {
		const result = addInventoryItemSchema.safeParse({ ...validItem, name: 'AB' });
		expect(result.success).toBe(false);
	});

	it('rejects negative quantity', () => {
		const result = addInventoryItemSchema.safeParse({ ...validItem, quantity: -1 });
		expect(result.success).toBe(false);
	});

	it('rejects zero price', () => {
		const result = addInventoryItemSchema.safeParse({ ...validItem, price: 0 });
		expect(result.success).toBe(false);
	});

	it('rejects zero cost', () => {
		const result = addInventoryItemSchema.safeParse({ ...validItem, cost: 0 });
		expect(result.success).toBe(false);
	});

	it('rejects empty code', () => {
		const result = addInventoryItemSchema.safeParse({ ...validItem, code: '' });
		expect(result.success).toBe(false);
	});

	it('coerces string numbers', () => {
		const result = addInventoryItemSchema.safeParse({
			...validItem,
			quantity: '5',
			price: '30',
			cost: '20'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.quantity).toBe(5);
			expect(result.data.price).toBe(30);
			expect(result.data.cost).toBe(20);
		}
	});
});

describe('sellInventoryItemSchema', () => {
	it('accepts valid sale data', () => {
		const result = sellInventoryItemSchema.safeParse({
			items: [{ id: 'item1', quantity: 2 }],
			method: 'cash'
		});
		expect(result.success).toBe(true);
	});

	it('rejects empty items array', () => {
		const result = sellInventoryItemSchema.safeParse({
			items: [],
			method: 'cash'
		});
		expect(result.success).toBe(false);
	});

	it('rejects items with zero quantity', () => {
		const result = sellInventoryItemSchema.safeParse({
			items: [{ id: 'item1', quantity: 0 }],
			method: 'cash'
		});
		expect(result.success).toBe(false);
	});
});

describe('updateInventoryItemSchema', () => {
	it('requires an id', () => {
		const result = updateInventoryItemSchema.safeParse(validItem);
		expect(result.success).toBe(false);
	});

	it('accepts valid update with id', () => {
		const result = updateInventoryItemSchema.safeParse({ ...validItem, id: 'abc123' });
		expect(result.success).toBe(true);
	});
});
