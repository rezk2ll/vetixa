import { describe, it, expect } from 'vitest';
import {
	addVisitSchema,
	updateVisitSchema,
	payVisitSchema,
	addVisitItemsSchema,
	removeVisitItemSchema,
	removeVisitFileSchema,
	updateVisitDiagnosticSchema,
	updateVisitActionsSchema,
	updateVisitTreatmentSchema,
	updateVisitItemSchema
} from './visit';

describe('addVisitSchema', () => {
	it('accepts valid visit', () => {
		const result = addVisitSchema.safeParse({ motif: 'Vaccination' });
		expect(result.success).toBe(true);
	});

	it('defaults control and vaccination to false', () => {
		const result = addVisitSchema.safeParse({ motif: 'Consultation' });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.control).toBe(false);
			expect(result.data.vaccination).toBe(false);
		}
	});

	it('rejects empty motif', () => {
		const result = addVisitSchema.safeParse({ motif: '' });
		expect(result.success).toBe(false);
	});
});

describe('updateVisitSchema', () => {
	it('requires id', () => {
		const result = updateVisitSchema.safeParse({ motif: 'Suivi' });
		expect(result.success).toBe(false);
	});

	it('accepts valid update', () => {
		const result = updateVisitSchema.safeParse({ motif: 'Suivi', id: 'v1' });
		expect(result.success).toBe(true);
	});

	it('coerces string visit_price to number', () => {
		const result = updateVisitSchema.safeParse({ motif: 'Suivi', id: 'v1', visit_price: '50' });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.visit_price).toBe(50);
		}
	});
});

describe('payVisitSchema', () => {
	it('accepts valid payment', () => {
		const result = payVisitSchema.safeParse({
			id: 'v1',
			amount: 100,
			method: 'cash',
			description: 'Paiement'
		});
		expect(result.success).toBe(true);
	});

	it('rejects zero amount', () => {
		const result = payVisitSchema.safeParse({
			id: 'v1',
			amount: 0,
			method: 'cash',
			description: 'test'
		});
		expect(result.success).toBe(false);
	});

	it('coerces string amounts', () => {
		const result = payVisitSchema.safeParse({
			id: 'v1',
			amount: '75',
			method: 'tpe',
			incash: '100',
			outcash: '25',
			description: 'test'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.amount).toBe(75);
			expect(result.data.incash).toBe(100);
			expect(result.data.outcash).toBe(25);
		}
	});
});

describe('addVisitItemsSchema', () => {
	it('accepts valid items', () => {
		const result = addVisitItemsSchema.safeParse({ id: 'v1', items: ['item1', 'item2'] });
		expect(result.success).toBe(true);
	});

	it('rejects empty item strings', () => {
		const result = addVisitItemsSchema.safeParse({ id: 'v1', items: [''] });
		expect(result.success).toBe(false);
	});
});

describe('removeVisitItemSchema', () => {
	it('accepts valid data', () => {
		const result = removeVisitItemSchema.safeParse({ id: 'v1', item: 'item1' });
		expect(result.success).toBe(true);
	});

	it('rejects empty item', () => {
		const result = removeVisitItemSchema.safeParse({ id: 'v1', item: '' });
		expect(result.success).toBe(false);
	});
});

describe('removeVisitFileSchema', () => {
	it('accepts valid data', () => {
		const result = removeVisitFileSchema.safeParse({ id: 'v1', file: 'file1' });
		expect(result.success).toBe(true);
	});

	it('rejects empty file', () => {
		const result = removeVisitFileSchema.safeParse({ id: 'v1', file: '' });
		expect(result.success).toBe(false);
	});
});

describe('updateVisitDiagnosticSchema', () => {
	it('accepts valid diagnostic update', () => {
		const result = updateVisitDiagnosticSchema.safeParse({
			id: 'v1',
			observations: 'Bonne santé'
		});
		expect(result.success).toBe(true);
	});

	it('allows omitting observations', () => {
		const result = updateVisitDiagnosticSchema.safeParse({ id: 'v1' });
		expect(result.success).toBe(true);
	});
});

describe('updateVisitActionsSchema', () => {
	it('accepts valid actions update', () => {
		const result = updateVisitActionsSchema.safeParse({ id: 'v1', actions: 'Injection' });
		expect(result.success).toBe(true);
	});
});

describe('updateVisitTreatmentSchema', () => {
	it('accepts valid treatment update', () => {
		const result = updateVisitTreatmentSchema.safeParse({ id: 'v1', treatment: 'Antibiotique' });
		expect(result.success).toBe(true);
	});
});

describe('updateVisitItemSchema', () => {
	it('accepts valid item update', () => {
		const result = updateVisitItemSchema.safeParse({
			id: 'v1',
			item: 'item1',
			discount: 10,
			quantity: 2
		});
		expect(result.success).toBe(true);
	});

	it('coerces string discount and quantity', () => {
		const result = updateVisitItemSchema.safeParse({
			id: 'v1',
			item: 'item1',
			discount: '15',
			quantity: '3'
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.discount).toBe(15);
			expect(result.data.quantity).toBe(3);
		}
	});
});
