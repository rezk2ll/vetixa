import { describe, it, expect } from 'vitest';
import { addAgendaEventSchema, updateAgendaEventSchema } from './agenda';

const validEvent = {
	start: '2024-01-15T10:00:00',
	end: '2024-01-15T11:00:00',
	title: 'Consultation'
};

describe('addAgendaEventSchema', () => {
	it('accepts valid event data', () => {
		const result = addAgendaEventSchema.safeParse(validEvent);
		expect(result.success).toBe(true);
	});

	it('rejects empty start', () => {
		const result = addAgendaEventSchema.safeParse({ ...validEvent, start: '' });
		expect(result.success).toBe(false);
	});

	it('rejects empty end', () => {
		const result = addAgendaEventSchema.safeParse({ ...validEvent, end: '' });
		expect(result.success).toBe(false);
	});

	it('rejects empty title', () => {
		const result = addAgendaEventSchema.safeParse({ ...validEvent, title: '' });
		expect(result.success).toBe(false);
	});

	it('allows optional description and location', () => {
		const result = addAgendaEventSchema.safeParse({
			...validEvent,
			description: 'Suivi vaccin',
			location: 'Salle 2'
		});
		expect(result.success).toBe(true);
	});
});

describe('updateAgendaEventSchema', () => {
	it('requires an id', () => {
		const result = updateAgendaEventSchema.safeParse(validEvent);
		expect(result.success).toBe(false);
	});

	it('accepts valid update with id', () => {
		const result = updateAgendaEventSchema.safeParse({ ...validEvent, id: 'evt1' });
		expect(result.success).toBe(true);
	});
});
