import { z } from 'zod';

export const addAgendaEventSchema = z.object({
	start: z.string().min(1, { message: 'Date de début invalide' }),
	end: z.string().min(1, { message: 'Date de fin invalide' }),
	title: z.string().min(1, { message: 'Titre invalide' }),
	description: z.string().optional(),
	location: z.string().optional()
});

export const updateAgendaEventSchema = addAgendaEventSchema.extend({
	id: z.string().min(1, { message: 'Id agenda invalide' })
});
