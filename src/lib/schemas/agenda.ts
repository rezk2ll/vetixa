import { z } from 'zod';

export const addAgendaEventSchema = z.object({
	start: z.string().min(1),
	end: z.string().min(1),
	title: z.string().min(1),
	description: z.string().optional(),
	location: z.string().optional()
});

export const updateAgendaEventSchema = addAgendaEventSchema.extend({
	id: z.string().min(1)
});
