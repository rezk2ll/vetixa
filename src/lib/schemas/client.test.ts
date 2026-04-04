import { describe, it, expect } from 'vitest';
import { addClientSchema, updateClientSchema } from './client';

const validClient = {
	firstname: 'Jean',
	lastname: 'Dupont',
	email: 'jean@example.com',
	tel: '12345678'
};

describe('addClientSchema', () => {
	it('accepts valid client data', () => {
		const result = addClientSchema.safeParse(validClient);
		expect(result.success).toBe(true);
	});

	it('accepts empty email string', () => {
		const result = addClientSchema.safeParse({ ...validClient, email: '' });
		expect(result.success).toBe(true);
	});

	it('rejects invalid email', () => {
		const result = addClientSchema.safeParse({ ...validClient, email: 'not-email' });
		expect(result.success).toBe(false);
	});

	it('rejects empty firstname', () => {
		const result = addClientSchema.safeParse({ ...validClient, firstname: '' });
		expect(result.success).toBe(false);
	});

	it('rejects empty lastname', () => {
		const result = addClientSchema.safeParse({ ...validClient, lastname: '' });
		expect(result.success).toBe(false);
	});

	it('rejects empty tel', () => {
		const result = addClientSchema.safeParse({ ...validClient, tel: '' });
		expect(result.success).toBe(false);
	});

	it('allows optional address and note', () => {
		const result = addClientSchema.safeParse({
			...validClient,
			address: '123 Rue Test',
			note: 'VIP'
		});
		expect(result.success).toBe(true);
	});
});

describe('updateClientSchema', () => {
	it('requires an id', () => {
		const result = updateClientSchema.safeParse(validClient);
		expect(result.success).toBe(false);
	});

	it('accepts valid update data with id', () => {
		const result = updateClientSchema.safeParse({ ...validClient, id: 'abc123' });
		expect(result.success).toBe(true);
	});

	it('rejects empty id', () => {
		const result = updateClientSchema.safeParse({ ...validClient, id: '' });
		expect(result.success).toBe(false);
	});
});
